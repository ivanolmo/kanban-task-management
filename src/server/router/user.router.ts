import { decode, encode } from '@/utils/base64';
import { signJwt } from '@/utils/jwt';
import sendLoginEmail from '@/utils/mailer';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { TRPCError } from '@trpc/server';
import { getBaseUrl } from 'src/utils/getBaseUrl';
import { serialize } from 'cookie';
import z from 'zod';

import { createRouter } from '../createRouter';

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
});

const requestOTPSchema = z.object({
  email: z.string().email(),
  redirect: z.string().default('/'),
});

const verifyOTPSchema = z.object({
  hash: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type RequestOTPInput = z.infer<typeof requestOTPSchema>;

export const userRouter = createRouter()
  .mutation('register-user', {
    input: createUserSchema,
    resolve: async ({ ctx, input }) => {
      const { email, name } = input;

      try {
        const user = await ctx.prisma.user.create({
          data: {
            email,
            name,
          },
        });

        return user;
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'User already exists',
            });
          }
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
        });
      }
    },
  })
  .mutation('request-otp', {
    input: requestOTPSchema,
    resolve: async ({ ctx, input }) => {
      const { email, redirect } = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      const otp = await ctx.prisma.loginToken.create({
        data: {
          redirect,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      await sendLoginEmail({
        otp: encode(`${otp.id}:${user.email}`),
        url: getBaseUrl(),
        email: user.email,
      });

      return true;
    },
  })
  .query('verify-otp', {
    input: verifyOTPSchema,
    resolve: async ({ ctx, input }) => {
      const decoded = decode(input.hash).split(':');

      const [id, email] = decoded;

      const token = await ctx.prisma.loginToken.findFirst({
        where: {
          id,
          user: {
            email,
          },
        },
        include: {
          user: true,
        },
      });

      if (!token) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Invalid token',
        });
      }

      const jwt = signJwt({
        id: token.user.id,
        email: token.user.email,
      });

      ctx.res.setHeader('Set-Cookie', serialize('token', jwt, { path: '/' }));

      return {
        redirect: token.redirect,
      };
    },
  })
  .query('me', {
    resolve: async ({ ctx }) => {
      return ctx.user;
    },
  });

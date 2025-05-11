// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/my-teams', '/profile'];
const publicRoutes = ['/login', '/sign-up'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          ),
      },
    }
  );

  const pathname = request.nextUrl.pathname;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  const { data: userSession } = await supabase.auth.getUser();

  // Redirect authenticated users away from /login and /sign-up
  if (isPublic && userSession?.user) {
    return NextResponse.redirect(new URL('/', request.url)); // Redirect to home page or dashboard
  }

  // If trying to access protected routes and not authenticated, redirect to login
  if (isProtected && !userSession?.user) {
    return NextResponse.redirect(new URL('/', request.url)); // Redirect to login page
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

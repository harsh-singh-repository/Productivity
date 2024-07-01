import {
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/protected(.*)',
  "/organisation(.*)",
  "./select-org(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectedRoute(req)) {
    if(auth().userId && !isProtectedRoute(req)){
      let path = "/select-org"
      if(auth().userId && auth().orgId){
        path = `organisation/${auth().userId}`
      }
      const organisationUrl = new URL(path,req.url);
      return NextResponse.redirect(organisationUrl);
    }
    
    if(!auth().userId && isProtectedRoute(req)){
       return auth().redirectToSignIn({returnBackUrl: req.url})
    }
    
    if(auth().userId && !auth().orgId && req.nextUrl.pathname !== "/select-org"){
      const orgSelection = new URL("/select-org",req.url);
      return NextResponse.redirect(orgSelection);
    }
     return auth().redirectToSignIn();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

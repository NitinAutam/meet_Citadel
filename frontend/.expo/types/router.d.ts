/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/chats`; params?: Router.UnknownInputParams; } | { pathname: `/events`; params?: Router.UnknownInputParams; } | { pathname: `/explore`; params?: Router.UnknownInputParams; } | { pathname: `/notifications`; params?: Router.UnknownInputParams; } | { pathname: `/profile`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/chats`; params?: Router.UnknownOutputParams; } | { pathname: `/events`; params?: Router.UnknownOutputParams; } | { pathname: `/explore`; params?: Router.UnknownOutputParams; } | { pathname: `/notifications`; params?: Router.UnknownOutputParams; } | { pathname: `/profile`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/chats${`?${string}` | `#${string}` | ''}` | `/events${`?${string}` | `#${string}` | ''}` | `/explore${`?${string}` | `#${string}` | ''}` | `/notifications${`?${string}` | `#${string}` | ''}` | `/profile${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/chats`; params?: Router.UnknownInputParams; } | { pathname: `/events`; params?: Router.UnknownInputParams; } | { pathname: `/explore`; params?: Router.UnknownInputParams; } | { pathname: `/notifications`; params?: Router.UnknownInputParams; } | { pathname: `/profile`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}

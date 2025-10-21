import type {LoadContext, Plugin} from '@docusaurus/types';

export default function redirectPlugin(context: LoadContext): Plugin {
  return {
    name: 'docusaurus-plugin-client-redirects',
    async contentLoaded({actions}) {
      const {addRoute} = actions;
      
      // Redirect old intro route to new introduction
      addRoute({
        path: '/docs/intro',
        exact: true,
        component: '@theme/DocPage',
        routes: [{
          path: '/docs/intro',
          component: '@theme/DocRedirect',
          exact: true,
          redirect: '/docs/introduction/what-is-zk-kit',
        }],
      });
    },
  };
}


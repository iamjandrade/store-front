import AccessDirective from '../directives/access-directive.js'

export default ({ app }) => 
{
  app.directive('access', AccessDirective)
}
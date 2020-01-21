define([
  'multi-app-id/content', 'multi-app-id/route', 'multi-app-id/emitter',
  'multi-app-id/login', 'multi-app-id/chat',
], function ($content, route, emitter, Login, Chat) {
  console.log('something')

  var routes = [Login, Chat]

  emitter.on('route::change', function (location) {
    console.log('location', location)
    var content = routes.find(function (page) {
      return page.path === location.pathname
    })
    $content.html(content(location.state))
  })

  $content.html(Login())
})
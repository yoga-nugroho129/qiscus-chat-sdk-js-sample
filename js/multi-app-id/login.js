define([
  'jquery', 'multi-app-id/route', 'multi-app-id/content', 'multi-app-id/qiscus',
  'service/html',
], function ($, route, $content, Qiscus, html) {

  function LoginPage () {

    // For some reason, jquery.on('submit') are very slow
    // and did not want to call qiscus.setUser
    document.addEventListener('submit', function (event) {
      if (event.target.id === 'LoginForm-appId') {
        event.preventDefault()
        var appId = $('#app-id').val()
        var userId = $('#user-id').val()
        var userKey = $('#user-key').val()
        var username = $('#username').val()
        var userTarget = $('#user-target').val()
        Qiscus.setup(appId)
        Qiscus.setUser(userId, userKey, username, null, null, function (user, error) {
          if (error) return console.error('Error when login', error)

          Qiscus.chatUser(userTarget, null, function (room, error) {
            if (error) return console.error('Error when getting room detail', error)
            console.log('room', room)
            route.push('/chat-room', { roomId: room.id })
          })
        })
      }
    })
    return html`
      <div class="LoginPage">
        <!--<img src="/img/logo.svg" class="logo" alt="qiscus-logo" />-->
        <form id="LoginForm-appId">
          <div class="form-group">
            <label for="app-id">App ID</label>
            <input id="app-id" name="app-id" type="text" value="sdksample" autocomplete="off" />
          </div>
          <div class="form-group">
            <label for="userId">User ID</label>
            <input id="user-id" type="text" name="user-id" value="guest-1001" autocomplete="off" />
          </div>
          <div class="form-group">
            <label for="user-key">User Key</label>
            <input id="user-key" type="password" name="user-key" value="passkey" />
          </div>
          <div class="form-group">
            <label for="user-target">User Target</label>
            <input type="text" id="user-target" name="user-target" value="guest-1002" />
          </div>
          <div class="form-group">
            <button type="submit" id="submit-login-btn">
              Start <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    `
  }

  LoginPage.path = '/login'

  return LoginPage
})
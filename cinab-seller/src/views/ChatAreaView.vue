<template>
  <div class="flex h-screen">
    <!-- User list -->
    <div class="w-1/4 bg-gray-200 p-4">
      <h2 class="text-lg font-semibold mb-2">Online Users</h2>
      <ul>
        <li v-for="(user, index) in onlineUsers" :key="index" class="mb-1">{{ user }}</li>
      </ul>
    </div>

    <!-- Chat window -->
    <div class="w-3/4 p-4">
      <div class="border rounded p-4 h-3/4 mb-4 overflow-y-auto" id="chatBox">
        <!-- Messages -->
        <div v-for="(message, index) in messages" :key="index">
          <div
            :class="{
              'flex justify-end': message.user === currentUser,
              'flex justify-start': message.user !== currentUser
            }"
            class="mb-2"
          >
            <div
              :class="{
                'text-blue-700 bg-blue-100 ml-auto w-3/4 rounded-lg p-2 inline-block max-w-xs':
                  message.user === currentUser,
                'text-gray-900 bg-gray-200 mr-auto w-3/4 rounded-lg p-2 inline-block max-w-xs':
                  message.user !== currentUser
              }"
            >
              <span class="font-semibold">{{ message.user }}:</span> {{ message.text }}
            </div>
          </div>
        </div>
      </div>

      <!-- Message input -->
      <div class="relative w-full">
        <input
          type="text"
          v-model="newMessage"
          @keydown.enter="sendMessage"
          class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Type your message..."
          required
        />
        <button
          @click="sendMessage"
          class="absolute top-0 right-0 h-full py-2.5 px-4 rounded-md text-sm font-medium text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <i class="fa fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMessage: '',
      currentUser: 'User1', // Replace with authenticated user
      messages: [
        { user: 'User1', text: 'Hello!' },
        { user: 'User2', text: 'Hi there!' },
        { user: 'User1', text: 'How are you?' },
        { user: 'User2', text: "I'm good, thanks!" }
      ],
      onlineUsers: ['User1', 'User2', 'User3'] // Dummy online users
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        const message = {
          user: this.currentUser,
          text: this.newMessage.trim()
        }
        this.messages.push(message)
        this.newMessage = ''
        this.$nextTick(this.scrollToBottom)
      }
    },
    scrollToBottom() {
      const chatBox = this.$el.querySelector('#chatBox')
      if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight
      }
    }
  }
}
</script>

<style>
/* Tailwind CSS classes or your custom styles */
</style>

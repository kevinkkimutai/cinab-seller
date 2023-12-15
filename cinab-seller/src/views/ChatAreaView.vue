<template>
  <div class="flex h-[96vh] max-h-[96vh]">
    <!-- User list -->
    <div class="w-1/4 bg-gray-200 h-full p-4 shadow-lg border border-white">
      <h2 class="text-lg font-semibold mb-2">Online Users</h2>
      <ul>
        <li
          v-for="(user, index) in onlineUsers"
          :key="index"
          @click="selectUser(user)"
          class="mb-1 cursor-pointer"
        >
          {{ user }}
        </li>
      </ul>
    </div>

    <!-- Chat window -->
    <div class="w-3/4">
      <!-- Navbar to display the selected user -->
      <nav
        class="border-gray-200 shadow-lg border dark:bg-gray-800 dark:border-gray-700 h-[8vh] flex items-center p-4 rounded-sm"
      >
        <img
          v-if="selectedUser && selectedUserImage"
          :src="selectedUserImage"
          alt="Selected User Image"
          class="h-8 w-8 rounded-full mr-2"
        />
        <span v-if="selectedUser" class="text-black">{{ selectedUser }}</span>
      </nav>

      <!-- Messages -->
      <div class="border rounded p-4 h-[75vh] max-h-[75vh] mb-4 overflow-y-auto" id="chatBox">
        <div v-if="selectedUser">
          <div
            v-for="(message, index) in filteredMessages"
            :key="index"
            :class="{
              'flex justify-end': isCurrentUserSender(message),
              'flex justify-start': !isCurrentUserSender(message)
            }"
            class="mb-2"
          >
            <div
              :class="{
                'text-blue-700 bg-blue-100 ml-auto w-3/4 rounded-lg p-2 inline-block max-w-xs break-all':
                  isCurrentUserSender(message),
                'text-gray-900 bg-gray-200 mr-auto w-3/4 rounded-lg p-2 inline-block max-w-xs break-all':
                  !isCurrentUserSender(message)
              }"
            >
              {{ message.text }}
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-500">Select a user to start chatting.</p>
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
      currentUser: 'currentuser',
      selectedUser: null,
      selectedUserImage: '',
      messages: [
        {
          id: 1,
          user: 'User1',
          text: 'Hello!',
          image:
            'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg'
        },
        {
          id: 2,
          user: 'User2',
          text: 'Hi there!',
          image: 'https://www.allprodad.com/wp-content/uploads/2021/03/05-12-21-happy-people.jpg'
        },
        {
          id: 3,
          user: 'User3',
          text: 'How are you?',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRV3zP4UljSu76LHR98uGRWCkWHdqW8vD_UA&usqp=CAU'
        },
        {
          id: 4,
          user: 'User2',
          text: "I'm good, thanks!",
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDl-KYrq9OIToA7HFO7zsp4sV8D7rhoHU5fg&usqp=CAU'
        },
        { id: 5, user: 'Currentuser', text: "I'm good, thanks!", image: '' }
      ],
      onlineUsers: ['User1', 'User2', 'User3', 'Currentuser']
    }
  },
  computed: {
    filteredMessages() {
      if (this.selectedUser) {
        return this.messages.filter(
          (message) =>
            (message.user === this.currentUser && message.reciever === this.selectedUser) ||
            (message.user === this.selectedUser && message.reciever === this.currentUser)
        )
      } else {
        return []
      }
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '' && this.selectedUser) {
        const message = {
          id: this.messages.length + 1,
          user: this.currentUser,
          reciever: this.selectedUser,
          text: this.newMessage.trim()
        }
        this.messages.push(message)
        this.newMessage = ''
        this.$nextTick(this.scrollToBottom)
      }
    },
    scrollToBottom() {
      const chatBox = document.getElementById('chatBox')
      if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight
      }
    },
    selectUser(user) {
      this.selectedUser = user

      // Set the selected user's image based on your logic (replace the following line)
      const selectedUserObject = this.messages.find((message) => message.user === user)
      this.selectedUserImage = selectedUserObject ? selectedUserObject.image : ''
    },
    isCurrentUserSender(message) {
      return message.user === this.currentUser
    }
  }
}
</script>

<style>
/* Tailwind CSS classes or your custom styles */
</style>

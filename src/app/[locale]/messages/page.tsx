'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { dataStore } from '@/stores/dataStore'
import { Conversation, Message, Post } from '@/types'
import { 
  MessageCircle, 
  Send, 
  Search, 
  User, 
  Clock, 
  CheckCheck,
  Phone,
  MoreVertical,
  Archive,
  Trash2
} from 'lucide-react'

export default function MessagesPage() {
  const params = useParams()
  const locale = params.locale as string
  
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load conversations for current user
    const userConversations = dataStore.getConversationsByUser('current_user')
    setConversations(userConversations)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      const conversationMessages = dataStore.getMessagesByConversation(selectedConversation.id)
      setMessages(conversationMessages)
      
      // Mark messages as read
      conversationMessages.forEach(message => {
        if (message.receiverId === 'current_user' && !message.isRead) {
          dataStore.markMessageAsRead(message.id)
        }
      })
    }
  }, [selectedConversation])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (!selectedConversation || !newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      conversationId: selectedConversation.id,
      senderId: 'current_user',
      receiverId: selectedConversation.buyerId === 'current_user' 
        ? selectedConversation.sellerId 
        : selectedConversation.buyerId,
      postId: selectedConversation.postId,
      content: newMessage.trim(),
      type: 'text',
      createdAt: new Date(),
      isRead: false
    }

    dataStore.sendMessage(message)
    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Update conversation last message
    const updatedConversations = conversations.map(conv => 
      conv.id === selectedConversation.id 
        ? { ...conv, lastMessage: message, lastMessageAt: new Date() }
        : conv
    )
    setConversations(updatedConversations)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'now'
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    if (days < 7) return `${days}d`
    return date.toLocaleDateString()
  }

  const getOtherUserName = (conversation: Conversation) => {
    const isCurrentUserBuyer = conversation.buyerId === 'current_user'
    const otherUserId = isCurrentUserBuyer ? conversation.sellerId : conversation.buyerId
    
    // In a real app, you'd fetch user details by ID
    return otherUserId === 'seller1' ? 'John Doe' : 
           otherUserId === 'seller2' ? 'Jane Smith' : 
           otherUserId === 'seller3' ? 'Mike Johnson' : 'User'
  }

  const getPostDetails = (postId: string): Post | null => {
    return dataStore.getPostById(postId) || null
  }

  const filteredConversations = conversations.filter(conv => {
    const otherUserName = getOtherUserName(conv)
    const post = getPostDetails(conv.postId)
    return (
      otherUserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post && post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Conversations Sidebar */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center mb-4">
            <MessageCircle className="h-6 w-6 mr-2" />
            Messages
          </h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center">
              <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
              <p className="text-gray-600">Start messaging by contacting sellers on their posts.</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => {
              const post = getPostDetails(conversation.postId)
              const otherUserName = getOtherUserName(conversation)
              const unreadCount = messages.filter(m => 
                m.conversationId === conversation.id && 
                m.receiverId === 'current_user' && 
                !m.isRead
              ).length

              return (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {otherUserName}
                        </p>
                        <div className="flex items-center space-x-2">
                          {unreadCount > 0 && (
                            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                              {unreadCount}
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessageAt)}
                          </span>
                        </div>
                      </div>
                      
                      {post && (
                        <p className="text-xs text-blue-600 mb-1 truncate">{post.title}</p>
                      )}
                      
                      {conversation.lastMessage && (
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage.senderId === 'current_user' ? 'You: ' : ''}
                          {conversation.lastMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {getOtherUserName(selectedConversation)}
                    </h2>
                    {(() => {
                      const post = getPostDetails(selectedConversation.postId)
                      return post && (
                        <p className="text-sm text-gray-600">About: {post.title}</p>
                      )
                    })()}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => {
                const isCurrentUser = message.senderId === 'current_user'
                
                return (
                  <div
                    key={message.id}
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        isCurrentUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-end mt-1 space-x-1 ${
                        isCurrentUser ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{formatTime(message.createdAt)}</span>
                        {isCurrentUser && (
                          <CheckCheck className={`h-3 w-3 ${
                            message.isRead ? 'text-blue-200' : 'text-blue-300'
                          }`} />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          // No conversation selected
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Select a conversation</h2>
              <p className="text-gray-600">Choose a conversation from the sidebar to start messaging.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

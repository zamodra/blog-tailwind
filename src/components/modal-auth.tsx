import { useState, ChangeEvent, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Cookies from 'js-cookie'
import { apiClient } from '@/lib/api'
import { useRouter } from 'next/router'


interface ModalAuthProps {
  open?: boolean;
  onClose?: () => void;
}

// Utility functions to set and get cookies using js-cookie
const setCookie = (name: string, value: string, days: number) => {
  Cookies.set(name, value, { expires: days, path: '/' })
}

const getCookie = (name: string): string | undefined => {
  return Cookies.get(name)
}

export function ModalAuth({ open: controlledOpen = true, onClose = () => {} }: ModalAuthProps) {
  const [name, setName] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)
  const [isProceedEnabled, setIsProceedEnabled] = useState<boolean>(false)
  const router = useRouter()

  // Load cookies if they exist when the component mounts
  useEffect(() => {
    const savedName = getCookie('name')
    const savedToken = getCookie('token')

    if (savedName) {
      setName(savedName)
    }

    if (savedToken) {
      setToken(savedToken)
    }

    if (savedName && savedToken) {
      setIsProceedEnabled(true)
    }
  }, [])

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newName = e.target.value
    setName(newName)
    setCookie('name', newName, 7) // Save to cookie for 7 days
  }

  const handleTokenChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const newToken = e.target.value
    setToken(newToken)
    setCookie('token', newToken, 7) // Save to cookie for 7 days
  }

  // API call to check the user's token
  const handleCheck = async (): Promise<void> => {
    try {
      const response = await apiClient.get("/users", {
        params: { name },
        headers: {
          Authorization: `Bearer ${token}`, // Use token from input
        },
      })
      setCookie('userId', response.data[0].id, 7)
      // If the API request is successful
      console.log('Successfully fetched posts:', response)
      setShowSuccessMessage(true) 
      setIsProceedEnabled(true) 
      setShowErrorMessage(false) 
    } catch (error) {
      console.error('Error fetching posts:', error)
      setShowErrorMessage(true) 
      setShowSuccessMessage(false) 
      setIsProceedEnabled(false)
    }
  }

  const handleProceed = (): void => {
    // Save the token to cookie when Proceed is clicked
    setCookie('token', token, 7) // Save token for 7 days
    router.push('/posts')
  }

  const dismissSuccessMessage = (): void => {
    setShowSuccessMessage(false)
  }

  const dismissErrorMessage = (): void => {
    setShowErrorMessage(false)
  }

  return (
    <Dialog open={controlledOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mt-3 sm:mt-5">
                <DialogTitle as="h3" className="text-lg text-center font-semibold text-gray-900">
                  Hello there!
                </DialogTitle>

                {/* Success Message */}
                {showSuccessMessage && (
                  <div className="rounded-md bg-green-50 p-4 mt-4">
                    <div className="flex">
                      <div className="shrink-0">
                        <CheckCircleIcon aria-hidden="true" className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">User found!</p>
                      </div>
                      <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                          <button
                            type="button"
                            onClick={dismissSuccessMessage}
                            className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                          >
                            <span className="sr-only">Dismiss</span>
                            <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {showErrorMessage && (
                  <div className="rounded-md bg-red-50 p-4 mt-4">
                    <div className="flex">
                      <div className="shrink-0">
                        <XMarkIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">User not found. Please try again.</p>
                      </div>
                      <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                          <button
                            type="button"
                            onClick={dismissErrorMessage}
                            className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                          >
                            <span className="sr-only">Dismiss</span>
                            <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Name Input */}
                <div className="mt-4">
                  <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="Enter your name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                {/* Token Input */}
                <div className="mt-4">
                  <label htmlFor="token" className="block text-sm/6 font-medium text-gray-900">
                    Token
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="token"
                      name="token"
                      value={token}
                      onChange={handleTokenChange}
                      placeholder="Enter your token"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-5 sm:mt-6">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={!name || !token} // Disable if 'name' or 'token' is empty
                  className={`${!name || !token ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-500'} inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
                >
                  Check
                </button>
                <button
                  type="button"
                  onClick={handleProceed}
                  disabled={!name || !token || !isProceedEnabled} // Disable if 'name', 'token', or 'isProceedEnabled' is falsy
                  className={`inline-flex w-full justify-center rounded-md ${!name || !token || !isProceedEnabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-500'} px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600`}
                >
                  Proceed
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}


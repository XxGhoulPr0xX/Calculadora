import React from 'react'
import { createRoot } from 'react-dom/client'
import { ConnectButton, ConnectDialog, Connect2ICProvider } from '@connect2ic/react'
import { createClient } from '@connect2ic/core'
import { InternetIdentity } from '@connect2ic/core/providers/internet-identity'
import './index.css'
import '@connect2ic/core/style.css'

const client = createClient({
    canisters: {
        calculator,
    },
    providers: [
        new InternetIdentity({
            providerUrl: 'http://127.0.0.1:8000/?canisterId=be2us-64aaa-aaaaa-qaabq-cai',
        }),
    ],
    globalProviderConfig: {
        /*
         * Disables dev mode in production
         * Should be enabled when using local canisters
         */
        dev: true,
    },
})

createRoot(document.getElementById('root')).render(
    <Connect2ICProvider client={client}>
        <div className='min-h-screen'>
            <header className='relative flex justify-start items-center p-4 border-b border-gray-600'>
                <div className='absolute top-2 right-2'>
                    <ConnectButton />
                </div>
            </header>
            <ConnectDialog />
            Hello
        </div>
    </Connect2ICProvider>,
)

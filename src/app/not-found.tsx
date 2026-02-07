'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';

import { motion } from 'motion/react';

import * as constants from '@/data/constants';

export default function NotFound() {
    const [homeLink, setHomeLink] = useState('/');

    useEffect(() => {
        document.title = `404 | ${constants.INFO.name.first}'s Portfolio`;

        if (typeof window !== 'undefined') {
            const currentProtocol = window.location.protocol;
            const currentHost = window.location.hostname;
            const parts = currentHost.split('.');

            if (parts.length > 2) {
                const rootDomain = parts.slice(-2).join('.');
                setHomeLink(`${currentProtocol}//${rootDomain}`);
            }
        }
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' as const }}
                className="relative inline-block"
            >
                <h1 className="font-header text-blue-light text-8xl font-bold md:text-9xl">404</h1>
                <span
                    className="font-header text-blue-lighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold whitespace-nowrap uppercase md:text-3xl"
                    style={{
                        WebkitTextStroke: '1px rgba(0,0,0,0.9)',
                        textShadow: `
            0 0 10px rgba(255,255,255,0.4),
            2px 2px 2px rgba(0,0,0,0.8)
        `,
                    }}
                >
                    NOT FOUND
                </span>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5, ease: 'easeOut' as const }}
                className="text-blue-lighter mt-8 text-xl md:text-2xl"
            >
                It seems you might be lost (or I&apos;m broken).
                <br />
                Let&apos;s get you back home!
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.3, ease: 'easeOut' as const }}
            >
                <Link
                    href={homeLink}
                    className="group border-blue-light text-blue-light relative mt-8 inline-flex h-12 w-[180px] items-center justify-center overflow-hidden rounded-lg border-2 font-bold"
                >
                    <span className="bg-blue-light absolute inset-0 scale-0 rounded-lg transition-transform duration-300 group-hover:scale-110" />
                    <span className="group-hover:text-navy-dark relative z-10 flex items-center gap-2 transition-colors duration-300">
                        <FaArrowLeft className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                        Return Home
                    </span>
                </Link>
            </motion.div>
        </main>
    );
}

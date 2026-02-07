import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

import { AnimatePresence, motion } from 'motion/react';

import { DownloadCV, Footer, SocialLinks } from './';
import { INFO } from '@/data/constants';

export const NavBar = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const heroSection = document.getElementById('hero');
        const handleScroll = () => {
            if (heroSection) {
                const scrollTop = window.scrollY;
                const heroHeight = heroSection.offsetHeight;
                setIsSticky(scrollTop > heroHeight / 1.5);
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const menuVariants = {
        closed: { rotate: 0, opacity: 1 },
        open: { rotate: 45, opacity: 0 },
    };

    const closeVariants = {
        closed: { rotate: -45, opacity: 0 },
        open: { rotate: 0, opacity: 1 },
    };

    return (
        <>
            <section
                id="navbar"
                className={`fixed top-0 left-0 z-50 w-full backdrop-blur-lg transition-all duration-500 ${
                    isSticky || isMenuOpen
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible -translate-y-full opacity-0'
                }`}
            >
                <div className="flex items-center justify-between px-10 py-3 sm:px-12">
                    <div className="flex flex-col">
                        <span className="font-header text-blue-light text-lg font-bold">
                            {INFO.name.first} {INFO.name.last}
                        </span>
                        <span className="font-body text-sm text-white">{INFO.title}</span>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden items-center space-x-3 md:flex">
                            <SocialLinks />
                            <DownloadCV />
                        </div>
                        <div className="relative h-8 w-8 md:hidden">
                            <motion.button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                                className="relative z-20 flex h-full w-full items-center justify-center focus:outline-none"
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    variants={menuVariants}
                                    animate={isMenuOpen ? 'open' : 'closed'}
                                    transition={{ duration: 0.3 }}
                                    className="absolute"
                                >
                                    <FiMenu className="text-blue-light h-6 w-6" />
                                </motion.div>
                                <motion.div
                                    variants={closeVariants}
                                    animate={isMenuOpen ? 'open' : 'closed'}
                                    transition={{ duration: 0.3 }}
                                    className="absolute"
                                >
                                    <FiX className="text-blue-light h-6 w-6" />
                                </motion.div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 0.5, ease: 'easeInOut' as const }}
                        className="bg-navy-dark fixed inset-0 z-40"
                    >
                        <div className="flex h-full flex-col justify-between">
                            <div className="flex flex-grow flex-col items-center justify-center space-y-4">
                                <div className="flex items-center space-x-3">
                                    <SocialLinks />
                                </div>
                                <div>
                                    <DownloadCV />
                                </div>
                            </div>
                            <div className="flex items-center justify-center p-4">
                                <Footer />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

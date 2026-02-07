'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';
import { FaCircleInfo, FaGithub, FaLink } from 'react-icons/fa6';
import { PiMouseScroll } from 'react-icons/pi';
import { TiTimes, TiTimesOutline } from 'react-icons/ti';

import { AnimatePresence, motion } from 'motion/react';

import {
    DownloadCV,
    Footer,
    NavBar,
    ParticlesBackground,
    SocialLinks,
    ToolTip,
} from '@/components';
import * as constants from '@/data/constants';

export default function Home() {
    useEffect(() => {
        document.title = `${constants.INFO.name.first}'s Portfolio`;

        if (typeof window !== 'undefined') {
            const currentProtocol = window.location.protocol;
            const currentHost = window.location.hostname;
            const parts = currentHost.split('.');

            if (parts.length > 2) {
                const rootDomain = parts.slice(-2).join('.');

                if (currentHost !== rootDomain) {
                    window.location.href = `${currentProtocol}//${rootDomain}`;
                }
            }
        }
    }, []);

    const heroContainerVariants = {
        hidden: {},
        show: {
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const fadeDownVariants = {
        hidden: { opacity: 0, y: -30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' as const },
        },
    };

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' as const },
        },
    };

    const fadeDownDelayed = {
        hidden: { opacity: 0, y: -30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' as const, delay: 2 },
        },
    };

    const projectsContainerVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' as const },
        },
    };

    const tabVariants = {
        enterFromLeft: { x: -50, opacity: 0 },
        exitToRight: { x: 50, opacity: 0 },
        enterFromRight: { x: 50, opacity: 0 },
        exitToLeft: { x: -50, opacity: 0 },
        center: { x: 0, opacity: 1 },
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { duration: 0.3, ease: 'easeOut' as const },
        },
    };

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const [activeTab, setActiveTab] = useState<'projects' | 'certifications'>('projects');
    const [selectedProject, setSelectedProject] = useState<null | (typeof constants.PROJECTS)[0]>(
        null,
    );
    const [selectedProjectImg, setSelectedProjectImg] = useState('50% 50%');
    const closeModal = () => setSelectedProject(null);

    return (
        <>
            <NavBar />
            <ParticlesBackground />
            <main>
                <section
                    id="hero"
                    className="relative flex min-h-screen flex-col items-center justify-center text-center"
                >
                    <motion.div
                        variants={heroContainerVariants}
                        initial="hidden"
                        animate="show"
                        className="relative z-10"
                    >
                        <div className="relative inline-block">
                            <p className="text-blue-lighter absolute -top-8 left-0 text-lg italic">
                                Hi, my Name is
                            </p>
                            <h1 className="font-header text-5xl font-bold md:text-7xl">
                                <motion.span
                                    variants={fadeDownVariants}
                                    className="text-blue-light inline-block"
                                >
                                    {constants.INFO.name.first}
                                </motion.span>
                                <motion.span
                                    variants={fadeUpVariants}
                                    className="ml-3 inline-block text-white"
                                >
                                    {constants.INFO.name.last}
                                </motion.span>
                                <motion.span
                                    variants={fadeDownVariants}
                                    className="text-blue-light ml-1 inline-block"
                                >
                                    !
                                </motion.span>
                            </h1>
                            <motion.p
                                variants={fadeDownVariants}
                                className="text-blue-lighter absolute right-0 -bottom-8 text-lg md:text-2xl"
                            >
                                {constants.INFO.title}
                            </motion.p>
                        </div>
                        <div className="mt-12 flex flex-col items-center gap-4">
                            <motion.div variants={fadeUpVariants} className="flex space-x-4">
                                <SocialLinks />
                            </motion.div>
                            <motion.div variants={fadeUpVariants}>
                                <DownloadCV />
                            </motion.div>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={fadeDownDelayed}
                        initial="hidden"
                        animate="show"
                        className="absolute bottom-12 left-1/2 flex -translate-x-1/2 transform justify-center"
                    >
                        <button
                            onClick={() => scrollToSection('projects-certifications')}
                            aria-label="Scroll to Next Section"
                            className="text-blue-light h-6 w-6 animate-bounce cursor-pointer focus:outline-none"
                        >
                            <PiMouseScroll className="h-7 w-7" />
                        </button>
                    </motion.div>
                </section>

                <section
                    id="projects-certifications"
                    className="flex flex-col items-center justify-center py-16"
                >
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 1 }}
                        variants={fadeDownVariants}
                        className="border-blue-light relative flex overflow-hidden rounded-lg border-4"
                    >
                        <motion.div
                            className="bg-blue-light absolute top-0 left-0 h-full w-40"
                            animate={{ x: activeTab === 'certifications' ? '100%' : '0%' }}
                            transition={{ duration: 0.3, ease: 'easeOut' as const }}
                        />
                        <button
                            className={`relative flex h-12 w-40 cursor-pointer items-center justify-center font-bold transition-all duration-300 hover:text-lg ${
                                activeTab === 'projects' ? 'text-navy-dark' : 'text-blue-light'
                            }`}
                            onClick={() => setActiveTab('projects')}
                        >
                            Projects
                        </button>
                        <button
                            className={`relative flex h-12 w-40 cursor-pointer items-center justify-center font-bold transition-all duration-300 hover:text-lg ${
                                activeTab === 'certifications'
                                    ? 'text-navy-dark'
                                    : 'text-blue-light'
                            }`}
                            onClick={() => setActiveTab('certifications')}
                        >
                            Certifications
                        </button>
                    </motion.div>

                    <motion.div
                        className="mt-8 w-full max-w-6xl px-4 text-center text-lg"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={projectsContainerVariants}
                    >
                        <AnimatePresence mode="wait">
                            {activeTab === 'projects' ? (
                                <motion.div
                                    key="projects-tab"
                                    initial="enterFromLeft"
                                    animate="center"
                                    exit="exitToRight"
                                    variants={tabVariants}
                                    transition={{ duration: 0.4 }}
                                    className="grid w-full max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3"
                                >
                                    {constants.PROJECTS.map((project, i) => {
                                        const isLastSingleItem =
                                            constants.PROJECTS.length % 3 === 1 &&
                                            i === constants.PROJECTS.length - 1;
                                        return (
                                            <motion.div
                                                key={`project-${i}`}
                                                layoutId={`project-${i}`}
                                                whileHover={{
                                                    scale: 1.04,
                                                    transition: {
                                                        duration: 0.5,
                                                        ease: 'easeOut' as const,
                                                    },
                                                }}
                                                className={`group hover:border-blue-light relative cursor-pointer overflow-hidden rounded-lg border-2 border-transparent shadow-md transition-colors duration-300 ${
                                                    isLastSingleItem ? 'md:col-start-2' : ''
                                                }`}
                                                onClick={() => setSelectedProject(project)}
                                            >
                                                <div className="relative aspect-video transition-colors duration-500">
                                                    <Image
                                                        src={project.image}
                                                        alt={project.title}
                                                        fill
                                                        draggable={false}
                                                        className="object-cover transition-transform duration-500 ease-out"
                                                        unoptimized
                                                        priority
                                                    />
                                                    <div className="absolute inset-0 flex flex-col items-center justify-start bg-black/0 pt-14 transition-colors duration-500 group-hover:bg-black/50">
                                                        <div className="text-blue-light flex items-center gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                                            <FaCircleInfo className="h-6 w-6" />
                                                        </div>
                                                    </div>
                                                    <div className="bg-navy-dark absolute bottom-0 left-0 w-full translate-y-4 px-4 py-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                                        <h3 className="text-blue-light text-xl font-bold">
                                                            {project.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="certifications-tab"
                                    initial="enterFromRight"
                                    animate="center"
                                    exit="exitToLeft"
                                    variants={tabVariants}
                                    transition={{ duration: 0.4 }}
                                    className="grid w-full max-w-6xl grid-cols-1 gap-8 px-4"
                                >
                                    {constants.CERTIFICATIONS.map((cert, i) => (
                                        <motion.a
                                            key={`cert-${i}`}
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variants={fadeIn}
                                            initial="hidden"
                                            animate="show"
                                            whileHover={{
                                                scale: 1.02,
                                                transition: {
                                                    duration: 0.3,
                                                    ease: 'easeOut' as const,
                                                },
                                            }}
                                            className="group bg-navy-dark hover:border-blue-light relative flex w-full overflow-hidden rounded-lg border-2 border-transparent text-white shadow-md transition-all duration-500 ease-out"
                                        >
                                            <div className="relative h-full w-24 flex-shrink-0">
                                                <Image
                                                    src={cert.thumbnail}
                                                    alt={cert.title}
                                                    fill
                                                    draggable={false}
                                                    className="object-cover"
                                                    unoptimized
                                                    priority
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col p-4 text-left">
                                                <div className="flex w-full items-center justify-between">
                                                    <h3 className="text-blue-light text-lg font-bold">
                                                        {cert.title}
                                                    </h3>
                                                    <span className="bg-blue-light text-navy-dark rounded px-2 py-1 text-sm font-bold">
                                                        {cert.year}
                                                    </span>
                                                </div>
                                                <p className="text-blue-lighter mt-2 text-sm">
                                                    {cert.description}
                                                </p>
                                            </div>
                                        </motion.a>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {selectedProject && (
                                <motion.div
                                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-[8px]"
                                    onClick={closeModal}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        onClick={(e) => e.stopPropagation()}
                                        className="bg-navy-dark relative max-h-[90vh] w-11/12 max-w-5xl overflow-y-auto rounded-lg border border-[var(--colour-navy-dark)] p-6 shadow-xl"
                                        style={{ boxShadow: '0 0 15px rgba(0, 0, 0, 0.8)' }}
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <FaCircleInfo className="text-blue-light h-7 w-7" />
                                                    <h3 className="text-2xl font-bold text-white">
                                                        {selectedProject.title}
                                                    </h3>
                                                </div>
                                                <button
                                                    onClick={closeModal}
                                                    aria-label="Close Modal"
                                                    className="group relative h-8 w-8 hover:cursor-pointer"
                                                >
                                                    <TiTimesOutline className="text-blue-light absolute inset-0 h-8 w-8 transition-all duration-300 group-hover:opacity-0" />
                                                    <TiTimes className="text-blue-light absolute inset-0 h-8 w-8 opacity-0 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100" />
                                                </button>
                                            </div>
                                            <div className="mt-4 border-t border-[var(--colour-blue-light)/50]" />
                                        </div>
                                        <div className="mt-4 flex flex-col-reverse gap-8 md:flex-row">
                                            <div className="flex-1 space-y-6 text-center md:text-left">
                                                <div className="flex items-center justify-center gap-6 md:hidden">
                                                    {selectedProject.github ? (
                                                        <a
                                                            href={selectedProject.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group text-blue-light flex items-center space-x-2 transition-all duration-300 focus:outline-none"
                                                        >
                                                            <FaGithub className="h-6 w-6 transition-transform duration-200 ease-out group-hover:scale-115" />
                                                            <span className="relative text-lg font-bold transition-colors duration-200 group-hover:text-white">
                                                                GitHub
                                                                <span
                                                                    className="bg-blue-light absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
                                                                    style={{
                                                                        transformOrigin: 'left',
                                                                    }}
                                                                />
                                                            </span>
                                                        </a>
                                                    ) : (
                                                        <div className="flex cursor-not-allowed items-center space-x-2 text-gray-500">
                                                            <FaGithub className="h-6 w-6" />
                                                            <span className="text-lg font-bold">
                                                                GitHub
                                                            </span>
                                                        </div>
                                                    )}
                                                    {selectedProject.link ? (
                                                        <a
                                                            href={selectedProject.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group text-blue-light flex items-center space-x-2 transition-all duration-300 focus:outline-none"
                                                        >
                                                            <FaLink className="h-6 w-6 transition-transform duration-200 ease-out group-hover:scale-115" />
                                                            <span className="relative text-lg font-bold transition-colors duration-200 group-hover:text-white">
                                                                Live Demo
                                                                <span
                                                                    className="bg-blue-light absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
                                                                    style={{
                                                                        transformOrigin: 'left',
                                                                    }}
                                                                />
                                                            </span>
                                                        </a>
                                                    ) : (
                                                        <div className="flex cursor-not-allowed items-center space-x-2 text-gray-500">
                                                            <FaLink className="h-6 w-6" />
                                                            <span className="text-lg font-bold">
                                                                Live Demo
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-4 text-center md:text-left">
                                                    <p className="text-blue-lighter pb-5 text-lg">
                                                        {selectedProject.description}
                                                    </p>
                                                    {selectedProject.keyConcepts?.length ? (
                                                        <ul className="text-blue-lighter grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                                                            {selectedProject.keyConcepts.map(
                                                                (concept, idx) => (
                                                                    <li
                                                                        key={idx}
                                                                        className="relative flex items-center"
                                                                    >
                                                                        <span
                                                                            className="absolute top-1/2 left-0 h-0 w-0 -translate-y-1/2 border-y-[4px] border-l-[6px] border-y-transparent"
                                                                            style={{
                                                                                borderLeftColor:
                                                                                    'var(--colour-blue-light)',
                                                                            }}
                                                                        />
                                                                        <span className="pl-6">
                                                                            {concept}
                                                                        </span>
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    ) : null}
                                                    <div className="flex flex-wrap justify-center gap-6 pt-10 md:justify-start">
                                                        {selectedProject.techStack.map(
                                                            (tech, idx) => (
                                                                <ToolTip
                                                                    label={tech.name}
                                                                    key={idx}
                                                                >
                                                                    <tech.icon className="h-8 w-8 cursor-pointer text-white transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                                                                </ToolTip>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center">
                                                <div
                                                    className="relative h-[300px] w-full overflow-hidden md:w-[500px]"
                                                    onMouseMove={(e) => {
                                                        const rect =
                                                            e.currentTarget.getBoundingClientRect();
                                                        const x =
                                                            ((e.clientX - rect.left) / rect.width) *
                                                            100;
                                                        const y =
                                                            ((e.clientY - rect.top) / rect.height) *
                                                            100;
                                                        setSelectedProjectImg(`${x}% ${y}%`);
                                                    }}
                                                    onMouseLeave={() =>
                                                        setSelectedProjectImg('50% 50%')
                                                    }
                                                >
                                                    <motion.div
                                                        whileHover={{ scale: 1.05 }}
                                                        transition={{ duration: 0.3 }}
                                                        style={{
                                                            transformOrigin: selectedProjectImg,
                                                        }}
                                                        className="absolute inset-0"
                                                    >
                                                        <Image
                                                            src={selectedProject.image}
                                                            alt={selectedProject.title}
                                                            fill
                                                            draggable={false}
                                                            className="rounded-lg object-cover"
                                                            unoptimized
                                                        />
                                                    </motion.div>
                                                </div>
                                                <div className="mt-4 hidden w-full items-center justify-between md:flex">
                                                    {selectedProject.github ? (
                                                        <a
                                                            href={selectedProject.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group text-blue-light flex items-center space-x-2 transition-all duration-300 focus:outline-none"
                                                        >
                                                            <FaGithub className="h-6 w-6 transition-transform duration-200 ease-out group-hover:scale-115" />
                                                            <span className="relative text-lg font-bold transition-colors duration-200 group-hover:text-white">
                                                                GitHub
                                                                <span
                                                                    className="bg-blue-light absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
                                                                    style={{
                                                                        transformOrigin: 'left',
                                                                    }}
                                                                />
                                                            </span>
                                                        </a>
                                                    ) : (
                                                        <div className="flex cursor-not-allowed items-center space-x-2 text-gray-500">
                                                            <FaGithub className="h-6 w-6" />
                                                            <span className="text-lg font-bold">
                                                                GitHub
                                                            </span>
                                                        </div>
                                                    )}
                                                    {selectedProject.link ? (
                                                        <a
                                                            href={selectedProject.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group text-blue-light flex items-center space-x-2 transition-all duration-300 focus:outline-none"
                                                        >
                                                            <FaLink className="h-6 w-6 transition-transform duration-200 ease-out group-hover:scale-115" />
                                                            <span className="relative text-lg font-bold transition-colors duration-200 group-hover:text-white">
                                                                Live Demo
                                                                <span
                                                                    className="bg-blue-light absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
                                                                    style={{
                                                                        transformOrigin: 'left',
                                                                    }}
                                                                />
                                                            </span>
                                                        </a>
                                                    ) : (
                                                        <div className="flex cursor-not-allowed items-center space-x-2 text-gray-500">
                                                            <FaLink className="h-6 w-6" />
                                                            <span className="text-lg font-bold">
                                                                Live Demo
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </section>

                <footer className="flex items-center justify-center">
                    <Footer />
                </footer>
            </main>
        </>
    );
}

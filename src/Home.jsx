import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import CapabilityMarquee from './CapabilityMarquee.jsx';
import { CoreServices, WhoWeAre, AiConsulting } from './HomeSections.jsx';

const PlayIcon = () => (
    <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const PauseIcon = () => (
    <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
);

// TYPED HEADLINE (hero only)
// - Screen readers get the full headline at once (aria-label); the typed copy is hidden from them.
// - An invisible copy of the full text reserves the space, so nothing below jumps while typing.
// - Visitors who turn off motion see the full headline immediately, with no cursor.
// - Remount with key={text} so each slide starts typing from zero.
const TYPE_SPEED_MS = 38;   // per character: about 1 second for these headlines
const TYPE_DELAY_MS = 250;  // let the slide fade in first

const TypedHeadline = ({ text, className = "" }) => {
    const reduceMotion = useReducedMotion();
    const [typed, setTyped] = useState(0);

    useEffect(() => {
        if (reduceMotion) return undefined;
        let interval;
        const start = setTimeout(() => {
            interval = setInterval(() => {
                setTyped((n) => {
                    if (n + 1 >= text.length) clearInterval(interval);
                    return Math.min(n + 1, text.length);
                });
            }, TYPE_SPEED_MS);
        }, TYPE_DELAY_MS);
        return () => {
            clearTimeout(start);
            clearInterval(interval);
        };
    }, [text, reduceMotion]);

    const shown = reduceMotion ? text.length : typed;
    const done = shown >= text.length;

    return (
        <h1 className={`relative ${className}`} aria-label={text}>
            <span aria-hidden="true" className="invisible">{text}</span>
            <span aria-hidden="true" className="absolute inset-0">
                {text.slice(0, shown)}
                {!reduceMotion && <span className={`typing-caret ${done ? 'typing-caret-done' : ''}`} />}
            </span>
        </h1>
    );
};

export default function Home({ onNavigate, onOpenArticle }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [heroSlideIndex, setHeroSlideIndex] = useState(0);

    // Hero slides: headlines and copy from the original engoldconsultingllc.com homepage
    const heroSlideContent = [
        {
            tag: "Engold Consulting",
            title: "Delivering Solutions That Count",
            subtitle: "Complimenting enabling technologies with best practice strategy, design and implementation."
        },
        {
            tag: "Over 20 years of experience",
            title: "Client-Centric IT Solutions",
            subtitle: "We deliver client centric IT solutions that support your goals and objectives."
        },
        {
            tag: "Risk and compliance",
            title: "Cost Effective Risk Compliance",
            subtitle: "Focusing on a cost effective view of addressing risk to enable compliance in all areas of your organization."
        }
    ];

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (!isPlaying) return;
        const timer = setInterval(() => {
            setHeroSlideIndex((prev) => (prev + 1) % heroSlideContent.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [isPlaying, heroSlideContent.length]);


    return (
        <main>
            {/* 1. HERO BANNER */}
            <section className="relative min-h-[max(600px,calc(100svh-4rem))] sm:min-h-[720px] lg:min-h-[760px] flex items-end px-4 sm:px-6 lg:px-8 text-left overflow-hidden bg-slate-950 text-white">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 filter brightness-105 contrast-105"
                    onError={(e) => { e.target.style.display = 'none'; }}
                >
                    <source src="/videos/Transitioning_Video.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30 z-0 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-0 pointer-events-none" />

                {/* Content sits at the bottom, just above the slide controls; the video fills the space above */}
                <div className="relative z-10 max-w-7xl mx-auto w-full pt-24 pb-24 sm:pb-32">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={heroSlideIndex}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4 sm:space-y-5"
                        >
                            <p className="text-sm sm:text-base font-semibold text-orange-400">
                                {heroSlideContent[heroSlideIndex].tag}
                            </p>

                            <TypedHeadline
                                key={heroSlideContent[heroSlideIndex].title}
                                text={heroSlideContent[heroSlideIndex].title}
                                className="text-[2.5rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-extrabold text-white tracking-tight leading-[1.03] max-w-5xl"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Subtitle, then actions, both left-aligned under the headline */}
                    <div className="mt-6 sm:mt-8 flex flex-col items-start gap-6 sm:gap-8">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={heroSlideIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-gray-100 text-base sm:text-xl leading-relaxed max-w-2xl"
                            >
                                {heroSlideContent[heroSlideIndex].subtitle}
                            </motion.p>
                        </AnimatePresence>

                        <div className="w-full sm:w-auto grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
                            <button
                                onClick={() => onNavigate('about')}
                                className="px-6 sm:px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors shadow-xl shadow-orange-500/30 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                            >
                                Learn More
                            </button>
                            <button
                                onClick={() => onNavigate('contact-us')}
                                className="px-6 sm:px-8 py-3.5 rounded-full border-2 border-white/80 text-white text-sm font-bold hover:bg-white hover:text-[#0F1B2D] transition-colors text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>

                {/* SLIDE INDICATORS (original pill-and-dot design)
                    Phones/tablets: horizontal, bottom-left, below the content.
                    Desktop: vertical, on the right edge, as before.
                    Each dot sits in a 44px tap area so it is easy to hit with a thumb. */}
                <div
                    className="absolute z-20 left-2 sm:left-4 bottom-4 sm:bottom-5 flex flex-row items-center lg:left-auto lg:right-4 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:flex-col"
                    role="group"
                    aria-label="Hero slides"
                >
                    {heroSlideContent.map((slide, idx) => {
                        const active = heroSlideIndex === idx;
                        return (
                            <button
                                key={slide.title}
                                onClick={() => setHeroSlideIndex(idx)}
                                aria-label={`Show slide ${idx + 1} of ${heroSlideContent.length}: ${slide.title}`}
                                aria-current={active ? 'true' : undefined}
                                className="group w-11 h-11 lg:w-8 lg:h-auto lg:py-1.5 flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-orange-400"
                            >
                                <span
                                    className={`block rounded-full transition-all ${active
                                        ? 'h-2.5 w-8 lg:h-8 lg:w-2.5 bg-orange-500 shadow-lg'
                                        : 'h-2.5 w-2.5 bg-white/60 group-hover:bg-white'
                                        }`}
                                />
                            </button>
                        );
                    })}
                </div>

                {/* AUTOPLAY PLAY/PAUSE TOGGLE (original design) */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20">
                    <button
                        onClick={togglePlayPause}
                        className="w-12 h-12 rounded-full border border-white/40 bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/70 hover:scale-105 transition-all shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                        aria-label={isPlaying ? 'Pause slides and video' : 'Play slides and video'}
                    >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                </div>
            </section>

            {/* CONTINUOUS MOTION STRIP: platforms, regulations & certifications (not the services, which Core services lists) */}
            <CapabilityMarquee />

            {/* 2. CORE SERVICES */}
            <CoreServices onNavigate={onNavigate} />

            {/* 3. WHO WE ARE */}
            <WhoWeAre onNavigate={onNavigate} />

            {/* 4. AI CONSULTING */}
            <AiConsulting onNavigate={onNavigate} onOpenArticle={onOpenArticle} />
        </main>
    );
}
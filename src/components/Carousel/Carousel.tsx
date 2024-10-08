/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface CarouselProps {
    images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Envolver nextSlide en useCallback para evitar su recreación en cada render
    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    // Envolver prevSlide en useCallback
    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }, [images.length]);

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Cambia cada 3 segundos

        // Limpia el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, [nextSlide]); // Solo depende de nextSlide, que ahora es estable

    return (
        <div className="relative w-full bg-white">
            <div className="overflow-hidden rounded-lg shadow-lg">
                <div className="relative">
                    <Link href="/store">
                        <img 
                            src={images[currentIndex]} 
                            alt={`Slide ${currentIndex}`}
                            className="w-full h-auto max-h-[70vh] object-contain" 
                        />
                    </Link>
                    <div className="absolute inset-0 bg-gradient-to-l from-white to-transparent w-1/4 left-0 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent w-1/4 right-0 pointer-events-none" />
                </div>
            </div>

            <button 
                onClick={nextSlide} 
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            >
                &#10095;
            </button>

            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            >
                &#10094;
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'} transition`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;


"use client"
import Image, { StaticImageData } from "next/image";
import { twMerge } from 'tailwind-merge';
import { useEffect, useRef, useState } from "react";
import { createCheckout } from "@/services/buy";

// Config do gsap para animação
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type PrincipleProductProps = {
    selectShoe: StaticImageData;
    title: string;
    bgColor?: string;
    textColor?: string;
    id: number;
    price: number;
}

export function PrincipleProduct({ selectShoe, title, bgColor, textColor, id, price }:PrincipleProductProps) {
    // Definindo o estilo padrão das tags.
    const defaultStyleContainer = "h-screen flex-1 flex flex-col items-center justify-center relative overflow-hidden ";
    const defaultStyleText = "-rotate-90 text-gray-700 text-[195.07px] font-extrabold absolute bottom-28 -right-[104px] w-fit h-56 select-none text-left text-left"
    const defaultStyleRepeatText = "-rotate-[35deg] text-gray-700 text-[120px] font-extrabold absolute top-[100vh] -right-28 w-max h-auto select-none text-left z-10 tracking-wider word-spacing opacity-0 flex justify-center items-center"

    // Conbinando os valores para a definição do estilo final da tag, podendo assim, aplicar novos estilos nas determinadas tags.
    const combinedClassContainer = twMerge(defaultStyleContainer, bgColor)
    const combinedClassText = twMerge(defaultStyleText, textColor)
    const combinedClassRepeatText = twMerge(defaultStyleRepeatText, textColor)

    // Referenciando o componente para animar no gsap
    const refContainerProduct = useRef(null);
    const refImageProduct = useRef(null);
    const refTitle = useRef(null);
    const refRepeatText = useRef(null);
    const refRepeatText2 = useRef(null);
    const refContainerPurchaseShoe = useRef(null);
    const refIconHeart = useRef(null);

    // States
    const [activeBuy, setActiveBuy] = useState<boolean>(false)

    useEffect(() => {}, [activeBuy, id])

    async function handleClickBuy() {
        try {
            const link = await createCheckout({
                id,
                price,
                title
            });
            if (!link) throw new Error("Checkout não foi criado")
            //window.location.href = link;
            window.open(link, '_blank');
        } catch (err:any) {
            console.log(err.message);
        }
    }

    return (
        <div
            className={combinedClassContainer}
            ref={refContainerProduct}
            onMouseLeave={() => {
                gsap.to(refContainerProduct.current, {
                    flexBasis: 1,
                    zIndex: 0,
                    boxShadow: "13px 15px 15px 15px rgba(0, 0, 0, 0)"
                })
                gsap.to(refImageProduct.current, {
                    marginRight: 0,
                    scale: 1
                })
                gsap.to(refTitle.current, {
                    opacity: 1
                })
                gsap.to(refRepeatText.current, {
                    opacity: 0
                })
                gsap.fromTo(refRepeatText2.current, { x: 300, duration: 0, ease: 'none'}, { x: '0', duration: 0, ease: 'none'});
                // const timeline = gsap.timeline({ repeat: 0, repeatDelay: 0});
                // timeline.to(refRepeatText2.current, { x: '0', duration: 0, ease: 'none'});
                gsap.to(refContainerPurchaseShoe.current, {
                    opacity: 0
                })
                setActiveBuy(false);
            }}
            onMouseEnter={() => {
                if (!activeBuy) {
                    gsap.to(refContainerProduct.current, {
                        flexBasis: 25,
                        zIndex: 100,
                        boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.5)"
                    })
                    gsap.to(refImageProduct.current, {
                        marginRight: "250px",
                        scale: 1.3
                    })
                    gsap.to(refTitle.current, {
                        opacity: 0
                    })
                    gsap.to(refRepeatText.current, {
                        opacity: 0.7
                    })
                    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0, yoyo: true });
                    timeline.fromTo(refRepeatText2.current, { x: 300, duration: 5, ease: 'none'}, { x: '+=40%', duration: 5, ease: 'none'});
                    gsap.to(refContainerPurchaseShoe.current, {
                        opacity: 1
                    })
                    setActiveBuy(true);
                }
            }}
        >
            <div className="z-50">
                <Image
                    alt="Produto a venda"
                    src={selectShoe}
                    className="w-full max-w-80 select-none transition hover:scale-110 cursor-pointer flex"
                    ref={refImageProduct}
                />
            </div>
            <span className={combinedClassText} ref={refTitle}>{title}</span>
            <div className={combinedClassRepeatText} ref={refRepeatText}>
                <span ref={refRepeatText2} className="flex h-36 justify-between gap-12">
                    <span>{title}</span>
                    <span>{title}</span>
                    <span>{title}</span>
                    <span>{title}</span>
                    <span>{title}</span>
                    <span>{title}</span>
                    <span>{id == 3 || id == 2 && title}</span>
                    <span>{id == 3 && title}</span>
                    <span>{id == 3 && title}</span>
                    <span>{id == 3 && title}</span>
                </span>
            </div>
            <div className="absolute right-4 bottom-0 opacity-0 w-fit z-50" ref={refContainerPurchaseShoe}>
                <div className="flex gap-8 mb-2">
                    <button
                        className="border border-gray-800 rounded-full py-1 px-7 transition hover:bg-gray-800 hover:text-white"
                        onClick={handleClickBuy}
                    >Buy Now :&#41;</button>
                    <button className="flex items-center gap-2" onClick={button => {
                        button.preventDefault();
                        console.log(button.currentTarget.children[0].setAttribute("fill", "#FC0707"));
                        console.log(button.currentTarget.children[0].children[0].setAttribute("stroke", "#FC0707"));
                    }}>
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg" ref={refIconHeart} className="transition">
                            <path d="M7.23625 3.53148C5.85042 0.278622 1 0.62508 1 4.7826C1 8.94012 7.23625 12.4048 7.23625 12.4048C7.23625 12.4048 13.4725 8.94012 13.4725 4.7826C13.4725 0.62508 8.62208 0.278622 7.23625 3.53148Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" className="transition"/>
                        </svg>
                        Add to Cart
                    </button>
                </div>
                <h2 className="text-gray-700 text-9xl font-extrabold select-none text-right">{title}</h2>
            </div>
        </div>
    )
}
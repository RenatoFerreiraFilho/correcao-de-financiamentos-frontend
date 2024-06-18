"use client";

import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

export default function Home() {
    var screen;
    const [paginaAtiva, setPaginaAtiva] = useState("calculadora"); //home ou calculadora
    const [paginaAtivaCalculadora, setPaginaAtivaCalculadora] = useState("inputs"); //inputs ou calculos
    const [paginaAtivaCalculos, setPaginaAtivaCalculos] = useState(5); //5y, 10y ou 15y

    const [numeroParcelas, setNumeroParcelas] = useState("");
    const [valorPrimeiraParcela, setValorPrimeiraParcela] = useState("");
    const [taxaDeJurosMensal, setTaxaDeJurosMensal] = useState("");
    const [sistemaDeFinanciamento, setSistemaDeFinanciamento] = useState("");
    const [indiceDeCorrecao, setIndiceDeCorrecao] = useState("");

    function handleNumeroParcelasChange({ currentTarget }) {
        setNumeroParcelas(currentTarget.value);
    }
    function handleValorPrimeiraParcelaChange({ currentTarget }) {
        setValorPrimeiraParcela(currentTarget.value);
    }
    function handleTaxaDeJurosMensal({ currentTarget }) {
        setTaxaDeJurosMensal(currentTarget.value);
    }
    function handleSistemaDeFinanciamento({ currentTarget }) {
        setSistemaDeFinanciamento(currentTarget.value);
    }
    function handleIndiceDeCorrecao({ currentTarget }) {
        setIndiceDeCorrecao(currentTarget.value);
    }
    const handlersSwipeable = useSwipeable({
        onSwiped: (eventData) => {
            if (eventData.dir === "Left") {
                if (paginaAtivaCalculos > 5) {
                    setPaginaAtivaCalculos(paginaAtivaCalculos - 5);
                }
            }
            if (eventData.dir === "Right") {
                if (paginaAtivaCalculos < 15) {
                    setPaginaAtivaCalculos(paginaAtivaCalculos + 5);
                }
            }
        },
    });

    if (paginaAtiva === "home") {
        screen = (
            <div class="p-5 bg-[url('/mar.jpg')] bg-cover bg-center h-dvh flex flex-col justify-between ">
                <div>
                    <div className="text-6xl text-white rotate-90 w-14">$</div>
                </div>
                <div>
                    <h1 className="text-4xl mb-5 text-white">Esse financiamento é para mim?</h1>
                    <div className="flex">
                        <h3 className="text-2xl text-white">Veja a situação atual de pessoas que fizeram o mesmo financiamento que o seu, há 5, 10 e 15 anos atrás</h3>
                        <button className="border rounded-full border-white-100/50 my-14" onClick={() => setPaginaAtiva("calculadora")}>
                            <ChevronRightIcon className="size-20 text-white/50" />
                        </button>
                    </div>
                </div>
                <span className="text-2xl text-green-600 text-center">Acesse o simulador</span>
            </div>
        );
    }
    if (paginaAtiva === "calculadora") {
        screen = (
            <div class="p-5 bg-[url('/mar.jpg')] bg-cover bg-center h-dvh flex flex-col justify-between ">
                <div>
                    <div className="text-6xl text-white rotate-90 w-14">$</div>
                </div>
                <div className="flex flex-col ">
                    {paginaAtivaCalculadora === "inputs" ? (
                        <div className="flex flex-col ">
                            <h1 className="text-4xl mb-5 text-white">Financiamento</h1>
                            <input
                                placeholder="Numero de parcelas"
                                id="inputNumeroParcelas"
                                className="border p-1 my-2 rounded-lg"
                                type="number"
                                value={numeroParcelas}
                                onChange={handleNumeroParcelasChange}
                                min={1}
                                max={240}
                            />
                            <input
                                placeholder="Valor da primeira parcela"
                                id="inputValorPrimeiraParcela"
                                className="border p-1 my-2 rounded-lg"
                                type="number"
                                value={valorPrimeiraParcela}
                                onChange={handleValorPrimeiraParcelaChange}
                                min={1}
                                max={9999}
                            />
                            <input
                                placeholder="Taxa de juros mensal"
                                id="inputTaxaDeJurosMensal"
                                className="border p-1 my-2 rounded-lg"
                                type="number"
                                value={taxaDeJurosMensal}
                                onChange={handleTaxaDeJurosMensal}
                                min={0}
                                max={0.1}
                            />
                            <select id="inputSistemaDeFinanciamento" className="border p-1 my-2 rounded-lg" value={sistemaDeFinanciamento} onChange={handleSistemaDeFinanciamento}>
                                <option value={""} disabled selected>
                                    Sistema de financiamento
                                </option>
                                <option value={"price"}>PRICE</option>
                                <option value={"sac"}>SAC</option>
                            </select>
                            <select id="inputIndiceDeCorrecao" className="border p-1 my-2 rounded-lg" value={indiceDeCorrecao} onChange={handleIndiceDeCorrecao}>
                                <option value={""} disabled selected>
                                    Índice de correção
                                </option>
                                <option value={"ipca"}>IPCA</option>
                                <option value={"igpm"}>IGPM</option>
                                <option value={"incc"}>INCC</option>
                            </select>
                        </div>
                    ) : (
                        <div className="flex flex-col ">
                            <h1 className="text-4xl mb-5 text-white">Resultado</h1>
                            <h3 className="text-1xl mb-2 text-white/50">
                                Valor financiado: R$ <span>X,XX</span>
                            </h3>
                            <h3 className="text-1xl mb-2 text-white/50">
                                Valor da 1ª parcela: R$ <span>X,XX</span>
                            </h3>
                            {paginaAtivaCalculos === 5 ? (
                                <div className="bg-black/30" {...handlersSwipeable}>
                                    <h2 className="text-2xl mb-2 text-white">Depois de 5 anos</h2>
                                    <p className="text-1xl mb-2 text-white">Quem financiou nessas condições há 5 anos atrás,</p>

                                    <h3 className="text-1xl mb-2 text-white">
                                        Já pagou um total de: <span className="text-red-500">R$ X,XX</span>
                                    </h3>
                                    <h3 className="text-1xl mb-2 text-white">
                                        Hoje paga uma parcela de: <span className="text-red-500">R$ X,XX</span>
                                    </h3>
                                    <h3 className="text-1xl mb-2 text-white">
                                        O valor para quitar hoje é de: <span className="text-red-500">R$ X,XX</span>
                                    </h3>
                                    <div id="div-dots-secundaria"></div>
                                </div>
                            ) : paginaAtivaCalculos === 10 ? (
                                <div className="bg-black/30" {...handlersSwipeable}>
                                    <h2 className="text-2xl mb-2 text-white">Depois de 10 anos</h2>
                                    <p className="text-1xl mb-2 text-white">Quem financiou nessas condições há 10 anos atrás,</p>

                                    <h3 className="text-1xl mb-2 text-white">
                                        Já pagou um total de: <span className="text-red-500">R$ X,XX</span>
                                    </h3>
                                    <h3 className="text-1xl mb-2 text-white">
                                        Hoje paga uma parcela de: <span className="text-red-500">R$ X,XX</span>
                                    </h3>
                                    <h3 className="text-1xl mb-2 text-white">
                                        O valor para quitar hoje é de: <span className="text-red-500">R$ X,XX</span>
                                    </h3>
                                    <div id="div-dots-secundaria"></div>
                                </div>
                            ) : (
                                <div className="bg-black/30" {...handlersSwipeable}>
                                    <h2 className="text-2xl mb-2 text-white">Depois de 15 anos</h2>
                                    <p className="text-1xl mb-2 text-white">Quem financiou nessas condições há 15 anos atrás,</p>

                                    <h3 className="text-1xl mb-2 text-white">
                                        Já pagou um total de: <span className="text-red-500">R$ X,XX</span>
                                    </h3>
                                    <h3 className="text-1xl mb-2 text-white">
                                        Hoje paga uma parcela de: <span className="text-red-500">R$ X,XX</span>
                                    </h3>
                                    <h3 className="text-1xl mb-2 text-white">
                                        O valor para quitar hoje é de: <span className="text-red-500">R$ X,XX</span>
                                    </h3>
                                    <div id="div-dots-secundaria"></div>
                                </div>
                            )}
                        </div>
                    )}
                    <div id="div-dots-principal"></div>
                    <button
                        className="border rounded-full border-white-100/50 my-14"
                        onClick={() => (paginaAtivaCalculadora === "calculos" ? setPaginaAtivaCalculadora("inputs") : setPaginaAtivaCalculadora("calculos"))}
                    >
                        {paginaAtivaCalculadora === "calculos" ? <ChevronLeftIcon className="size-20 text-white/50" /> : <ChevronRightIcon className="size-20 text-white/50" />}
                    </button>
                </div>
            </div>
        );
    }

    return <>{screen}</>;
}

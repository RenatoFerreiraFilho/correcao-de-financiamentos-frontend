"use client";

import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InputMask from "react-input-mask";

export default function Home() {
    var screen;
    const [paginaAtiva, setPaginaAtiva] = useState("home"); //home ou calculadora
    const [paginaAtivaCalculadora, setPaginaAtivaCalculadora] = useState("inputs"); //inputs ou calculos

    const [numeroParcelas, setNumeroParcelas] = useState("");
    const [valorPrimeiraParcela, setValorPrimeiraParcela] = useState("");
    const [taxaDeJurosMensal, setTaxaDeJurosMensal] = useState("");
    const [valorFloatTaxaDeJuros, setValorFloatTaxaDeJuros] = useState("");
    const [sistemaDeFinanciamento, setSistemaDeFinanciamento] = useState("");
    const [indiceDeCorrecao, setIndiceDeCorrecao] = useState("");

    const [resultadosCalculo, setResultadosCalculo] = useState({});

    function handleNumeroParcelasChange({ currentTarget }) {
        setNumeroParcelas(parseFloat(currentTarget.value));
    }
    function handleValorPrimeiraParcelaChange({ currentTarget }) {
        setValorPrimeiraParcela(parseFloat(currentTarget.value));
    }
    function handleTaxaDeJurosMensal({ currentTarget }) {
        setTaxaDeJurosMensal(currentTarget.value);
        const stringDecimalTaxaJuros = currentTarget.value.replace("%", "").replace(",", ".");
        const floatTaxa = parseFloat(stringDecimalTaxaJuros) / 100;
        const floatTaxaTratado = parseFloat(floatTaxa.toFixed(4));
        setValorFloatTaxaDeJuros(floatTaxaTratado);
    }
    function handleSistemaDeFinanciamento({ currentTarget }) {
        setSistemaDeFinanciamento(currentTarget.value);
    }
    function handleIndiceDeCorrecao({ currentTarget }) {
        setIndiceDeCorrecao(currentTarget.value);
    }
    function formatarFloatParaReal(valor) {
        const valorNumerico = parseFloat(valor);
        return `R$ ${valorNumerico.toLocaleString("pt-BR", {
            minimumFractionDigits: 2, // Garante duas casas decimais
            maximumFractionDigits: 2,
        })}`;
    }
    async function handleFormSubmit(e) {
        e.preventDefault();
        const reqData = {
            tipoTaxaDeJuros: "mensal",
            taxaDeJuros: valorFloatTaxaDeJuros,
            sistemaFinanciamento: sistemaDeFinanciamento,
            numeroPrestacoes: numeroParcelas,
            valorPrimeiraParcela: valorPrimeiraParcela,
            indiceCorrecao: indiceDeCorrecao,
        };
        console.log(reqData);
        try {
            // const response = await fetch("http://localhost:3001/processa-dados-financiamento", {
            //     // Substitua '/api/calcular' pela URL da sua API
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(reqData),
            // });
            const response = await fetch("https://correcao-de-financiamentos-backend.onrender.com/processa-dados-financiamento", {
                // Substitua '/api/calcular' pela URL da sua API
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqData),
            });

            if (response.ok) {
                const data = await response.json();
                setResultadosCalculo(data); // Atualiza o estado com os resultados
                setPaginaAtivaCalculadora("calculos"); // Muda para a tela de resultados
            } else {
                // Lidar com erros da API
                console.error("Erro na requisição:", response.status, response.statusText);
            }
        } catch (error) {
            // Lidar com erros de rede ou outros
            console.error("Erro:", error);
        }
    }

    // configurações da paginação de resultados (5 / 10 / 15 anos):
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        lazyLoad: true,

        customPaging: (i) => (
            <div
                className="custom-paging"
                style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "10px",
                    color: "transparent",
                    backgroundColor: "#EEE",
                }}
            >
                {i}
            </div>
        ),
    };

    if (paginaAtiva === "home") {
        screen = (
            <div class="p-5 bg-[url('/mar.jpg')] bg-cover bg-center h-dvh flex flex-col justify-between ">
                <div>
                    <div className="text-6xl text-white rotate-90 w-14 font-semibold">
                        <span>$</span>
                    </div>
                </div>
                <div className="flex flex-col mb-20">
                    <h1 className="text-4xl mb-5 text-white">Esse financiamento é para mim?</h1>
                    <div className="flex">
                        <h3 className="text-xl font-light text-white tracking-tighter flex-none w-56">
                            Veja a situação atual de pessoas que fizeram o mesmo financiamento que o seu, há 5, 10 e 15 anos atrás
                        </h3>
                        <div className="flex justify-center w-40">
                            <button className="border-4 rounded-full border-white/30 h-16 w-16" onClick={() => setPaginaAtiva("calculadora")}>
                                <ChevronRightIcon className="size-14 text-white/30" />
                            </button>
                        </div>
                    </div>
                </div>
                <span className="text-lg font-medium text-green-600 text-center" onClick={() => setPaginaAtiva("calculadora")}>
                    Acesse o simulador
                </span>
            </div>
        );
    }
    if (paginaAtiva === "calculadora") {
        screen = (
            <div class="p-5 bg-[url('/mar.jpg')] bg-cover bg-center h-dvh flex flex-col justify-between ">
                <div>
                    <div className="text-6xl text-white rotate-90 w-14 font-semibold">
                        <span
                            onClick={() => {
                                setPaginaAtiva("home");
                                setPaginaAtivaCalculadora("inputs");
                                setNumeroParcelas("");
                                setValorPrimeiraParcela("");
                                setTaxaDeJurosMensal("");
                                setValorFloatTaxaDeJuros("");
                                setSistemaDeFinanciamento("");
                                setIndiceDeCorrecao("");
                                setResultadosCalculo({});
                            }}
                        >
                            $
                        </span>
                    </div>
                </div>
                <div className="flex flex-col ">
                    {paginaAtivaCalculadora === "inputs" ? (
                        <div className="flex flex-col mb-14">
                            <h1 className="text-4xl mb-5 text-white">Financiamento</h1>
                            <form className="flex flex-col mb-14" onSubmit={handleFormSubmit}>
                                <input
                                    required
                                    placeholder="Número de parcelas"
                                    id="inputNumeroParcelas"
                                    className="border p-1 my-2 rounded-lg text-base font-normal"
                                    type="number"
                                    value={numeroParcelas}
                                    onChange={handleNumeroParcelasChange}
                                    min={1}
                                    max={240}
                                />
                                <input
                                    required
                                    placeholder="Valor da primeira parcela"
                                    id="inputValorPrimeiraParcela"
                                    className="border p-1 my-2 rounded-lg text-base font-normal"
                                    type="number"
                                    value={valorPrimeiraParcela}
                                    onChange={handleValorPrimeiraParcelaChange}
                                    min={1}
                                    max={9999}
                                />
                                <InputMask
                                    mask="9,99%" // Máscara para dois dígitos, ponto decimal e dois dígitos
                                    maskChar={"_"} // Remove o caractere de preenchimento padrão (geralmente "_")
                                    required
                                    placeholder="Taxa de juros mensal"
                                    value={taxaDeJurosMensal}
                                    onChange={handleTaxaDeJurosMensal}
                                    className="border p-1 my-2 rounded-lg text-base font-normal"
                                />
                                <select
                                    required
                                    id="inputSistemaDeFinanciamento"
                                    className="border p-1 my-2 rounded-lg text-base font-normal"
                                    value={sistemaDeFinanciamento}
                                    onChange={handleSistemaDeFinanciamento}
                                >
                                    <option value={""} disabled selected>
                                        Sistema de financiamento
                                    </option>
                                    <option value={"price"}>PRICE</option>
                                    <option value={"sac"}>SAC</option>
                                </select>
                                <select
                                    required
                                    id="inputIndiceDeCorrecao"
                                    className="border p-1 my-2 rounded-lg text-base font-normal"
                                    value={indiceDeCorrecao}
                                    onChange={handleIndiceDeCorrecao}
                                >
                                    <option value={""} disabled selected>
                                        Índice de correção
                                    </option>
                                    <option value={"ipca"}>IPCA</option>
                                    <option value={"igpm"}>IGPM</option>
                                    <option value={"incc"}>INCC</option>
                                </select>
                                <button type="submit" className="border-4 rounded-full border-green-700 my-14 w-16 h-16 mx-auto">
                                    {paginaAtivaCalculadora === "calculos" ? (
                                        <ChevronLeftIcon className="size-18 text-green-700 " />
                                    ) : (
                                        <ChevronRightIcon className="size-18 text-green-700" />
                                    )}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex flex-col ">
                            <h1 className="text-4xl mb-2 text-white justify-center">Resultado</h1>
                            <h3 className="text-lg font-light text-white/80">
                                Valor financiado: <span>{formatarFloatParaReal(resultadosCalculo.valorFinanciado)}</span>
                            </h3>
                            <h3 className="text-lg font-light mb-2 text-white/80">
                                Valor da 1ª parcela: <span>{formatarFloatParaReal(valorPrimeiraParcela)}</span>
                            </h3>
                            <Slider {...settings}>
                                <div className="bg-black/30 flex flex-col p-6">
                                    <h2 className="text-2xl text-white my-2">Depois de 5 anos</h2>
                                    <p className="text-lg  text-white font-light my-4">Quem financiou nessas condições há 5 anos atrás,</p>
                                    <div className="flex flex-row">
                                        <div className="flex flex-col justify-between basis-2/4">
                                            <h3 className="text-sm my-2 text-white font-light h-10">Já pagou um total de:</h3>
                                            <h3 className="text-sm my-2 text-white font-light h-10">Hoje paga uma parcela de:</h3>
                                            <h3 className="text-sm my-2 text-white font-light h-10">O valor para quitar hoje é:</h3>
                                        </div>
                                        <div className="flex flex-col text-right  justify-between basis-2/4">
                                            <span className="text-red-500 my-2 h-10 text-base font-semibold">
                                                {formatarFloatParaReal(resultadosCalculo.valorPagoCincoAnosAtras)}
                                            </span>
                                            <span className="text-red-500 my-2 h-10 text-base font-semibold">{formatarFloatParaReal(resultadosCalculo.parcelaCincoAnosAtras)}</span>
                                            <span className="text-red-500 my-2 h-10 text-base font-semibold">
                                                {formatarFloatParaReal(resultadosCalculo.saldoDevedorCincoAnosAtras)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-black/30 flex flex-col p-6">
                                    <h2 className="text-2xl text-white my-2">Depois de 10 anos</h2>
                                    <p className="text-lg  text-white font-light my-4">Quem financiou nessas condições há 10 anos atrás,</p>
                                    <div className="flex flex-row">
                                        <div className="flex flex-col justify-between basis-2/4">
                                            <h3 className="text-sm my-2 text-white font-light h-10">Já pagou um total de:</h3>
                                            <h3 className="text-sm my-2 text-white font-light h-10">Hoje paga uma parcela de:</h3>
                                            <h3 className="text-sm my-2 text-white font-light h-10">O valor para quitar hoje é:</h3>
                                        </div>
                                        <div className="flex flex-col text-right  justify-between basis-2/4">
                                            <span className="text-red-500 my-2 h-10 text-base font-semibold">{formatarFloatParaReal(resultadosCalculo.valorPagoDezAnosAtras)}</span>
                                            <span className="text-red-500 my-2 h-10 text-base font-semibold">{formatarFloatParaReal(resultadosCalculo.parcelaDezAnosAtras)}</span>
                                            <span className="text-red-500 my-2 h-10 text-base font-semibold">
                                                {formatarFloatParaReal(resultadosCalculo.saldoDevedorDezAnosAtras)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-black/30 flex flex-col p-6">
                                    <h2 className="text-2xl text-white my-2">Depois de 15 anos</h2>
                                    <p className="text-lg  text-white font-light my-4">Quem financiou nessas condições há 15 anos atrás,</p>
                                    <div className="flex flex-row">
                                        <div className="flex flex-col justify-between basis-2/4">
                                            <h3 className="text-sm my-2 text-white font-light h-10">Já pagou um total de:</h3>
                                            <h3 className="text-sm my-2 text-white font-light h-10">Hoje paga uma parcela de:</h3>
                                            <h3 className="text-sm my-2 text-white font-light h-10">O valor para quitar hoje é:</h3>
                                        </div>
                                        <div className="flex flex-col text-right  justify-between basis-2/4">
                                            <span className="text-red-500 my-2 h-10 text-base font-semibold">
                                                {formatarFloatParaReal(resultadosCalculo.valorPagoQuinzeAnosAtras)}
                                            </span>
                                            <span className="text-red-500 my-2 h-10 text-base font-semibold">
                                                {formatarFloatParaReal(resultadosCalculo.parcelaQuinzeAnosAtras)}
                                            </span>
                                            <span className="text-red-500 my-2 h-10 text-base font-semibold">
                                                {formatarFloatParaReal(resultadosCalculo.saldoDevedorQuinzeAnosAtras)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                            <button className="border-4 rounded-full border-green-700 my-14 w-16 h-16 mx-auto" onClick={() => setPaginaAtivaCalculadora("inputs")}>
                                <ChevronLeftIcon className="size-18 text-green-700 " />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return <>{screen}</>;
}

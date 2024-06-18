import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Main(props) {
    return (
        <div class="p-5 bg-[url('/mar.jpg')] bg-cover bg-center h-dvh flex flex-col justify-between ">
            <div>
                <div className="text-6xl text-white rotate-90 w-14">$</div>
            </div>
            <div>
                <h1 className="text-4xl mb-5 text-white">Esse financiamento é para mim?</h1>
                <div className="flex">
                    <h3 className="text-2xl text-white">Veja a situação atual de pessoas que fizeram o mesmo financiamento que o seu, há 5, 10 e 15 anos atrás</h3>
                    <button className="border rounded-full border-white-100/50 my-14">
                        <ChevronRightIcon className="size-20 text-white/50" />
                    </button>
                </div>
            </div>
            <span className="text-2xl text-green-600 text-center">Acesse o simulador</span>
        </div>
    );
}

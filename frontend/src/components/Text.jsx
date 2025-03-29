export default function Text({text1, text2}){
    return (
        <>
        <div className="flex gap-2 items-center">
             <p className="text-gray-500 uppercase">{text1} <span className="text-gray-700 font-medium uppercase">{text2}</span></p>
             <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
        </>
    )
}
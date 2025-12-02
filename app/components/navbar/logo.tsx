import Image from 'next/image';

export default function Logo() {
    return (
        <Image
            src="/vercel.svg"
            width={100}
            height={100}
            alt='Logo'
        />
    )
}
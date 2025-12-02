import Image from 'next/image';

export default function Logo() {
    return (
        <Image
            src="/vercel.svg"
            width={50}
            height={50}
            alt='Logo'
        />
    )
}
export const SearchIcon = ({ width = '20px', height = '20px', className }) => (
    <svg
        className={className}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="#fff">
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
    </svg>
)

export const UserIcon = ({ width = '36px', height = '36px', className }) => (
    <svg
        className={className}
        width={width}
        height={height}
        fill="#fff"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512">
        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
    </svg>
)

export const DownIcon = ({ width = '20px', height = '20px', className }) => (
    <svg
        className={className}
        width={width}
        height={height}
        fill="#fff"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512">
        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
    </svg>
)

export const CartIcon = ({ width = '30px', height = '30px', className }) => (
    <svg
        className={className}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512">
        <circle
            cx="176"
            cy="416"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
        />
        <circle
            cx="400"
            cy="416"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
        />
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M48 80h64l48 272h256"
        />
        <path
            d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
        />
    </svg>
)

export const StarIcon = ({ width = '10px', height = '10px', className, fill = '#FFBB1C' }) => (
    <svg
        width={width}
        height={height}
        className={className}
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512">
        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
    </svg>
)

export const StarIconWhite = ({ width = '10px', height = '10px', className }) => (
    <svg
        width={width}
        height={height}
        className={className}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="#d1d5db"
        viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
)

export const ArrowLeftIcon = ({ width = '18px', height = '18px', className }) => (
    <svg
        width={width}
        height={height}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512">
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
            d="M328 112 184 256l144 144"></path>
    </svg>
)

export const ArrowRightIcon = ({ width = '18px', height = '18px', className }) => (
    <svg
        width={width}
        height={height}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512">
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
            d="m184 112 144 144-144 144"></path>
    </svg>
)

export const AddIcon = ({ width = '20px', height = '20px', className }) => (
    <svg
        width={width}
        height={height}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512">
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M256 112v288m144-144H112"></path>
    </svg>
)

export const RemoveIcon = ({ width = '20px', height = '20px', className }) => (
    <svg
        width={width}
        height={height}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512">
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M400 256H112"></path>
    </svg>
)

export const EyeIcon = ({ width = '20px', height = '20px', className }) => (
    <svg
        width={width}
        height={height}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512">
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112"></path>
        <circle
            cx="256"
            cy="256"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="32"></circle>
    </svg>
)

export const LoadingIcon = ({ width = '20px', height = '20px', className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={width}
        height={height}
        aria-hidden="true"
        className={`inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300 ${className}`}
        viewBox="0 0 100 101">
        <path
            fill="currentColor"
            d="M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50m-90.919 0c0 22.6 18.32 40.92 40.919 40.92s40.919-18.32 40.919-40.92c0-22.598-18.32-40.918-40.919-40.918S9.081 27.992 9.081 50.591"></path>
        <path
            fill="currentFill"
            d="M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0 0 41.735 1.279c-2.474.414-3.922 2.919-3.285 5.344s3.12 3.849 5.6 3.484a40.916 40.916 0 0 1 44.131 25.769c.902 2.34 3.361 3.802 5.787 3.165"></path>
    </svg>
)

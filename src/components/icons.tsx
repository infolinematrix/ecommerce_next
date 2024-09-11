import {
  AvatarIcon,
  ChevronLeftIcon,
  GearIcon,
  HomeIcon,
  ImageIcon,
} from "@radix-ui/react-icons";

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => (
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 367 86"
      width="150"
      height="25"
    >
      <defs>
        <image
          width="600"
          height="600"
          id="img1"
          href="data:image/png;base64,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kCAsSBAWJAgLEoQFCcKCBGFBgrAgQViQICxIEBYkCAsShAUJwoIEYUGCsCBBWJAgLEgQFiQICxKEBQnCggRhQYKwIEFYkCAsSBAWJAgLEoQFCcKCBGFBgrAgQViQICxIEBYkCAsShAUJwoIEYUGCsCBBWJAgLEgQFiQICxKEBQnCggRhQYKwIEFYkCAsSBAWJAgLEoQFCcKCBGFBgrAgQViQICxIEBYkCAsShAUJwoIEYUGCsCBBWJAgLEgQFiQICxKEBQnCggRhQYKwIEFYkCAsSBAWJAgLEoQFCcKCBGFBgrAgQViQICxIEBYkCAsShAUJwoIEYUGCsCBBWJAgLEgQFiQICxKEBQnCggRhQYKwIEFYkCAsSBAWJAgLEoQFCcKCBGFBgrAgQViQICxIEBYkCAsShAUJwoIEYUGCsCBBWJAgLEgQFiQICxKEBQnCggRhQYKwIEFYkCAsSBAWJAgLEoQFCcKCBGFBgrAgQViQICxIEBYkCAsShAUJwoIEYUGCsCBBWJAgLEgQFiQICxKEBQnCggRhQYKwIEFYkCAsSBAWJAgLEoQFCcKCBGFBgrAgQViQICxIEBYkCAsShAUJwoIEYUGCsCBBWJAgLEgQFiQICxKEBQnCggRhQYKwIEFYkCAsSBAWJAgLEoQFCcKCBGFBgrAgQViQICxIEBYkCAsShAUJwoIEYUGCsCBBWJAgLEgQFiQICxKEBQnCggRhQYKwIEFYkCAsSBAWJAgLEoQFCcKCBGFBgrAgQViQICxIEBYkCAsShAUJwoIEYUGCsCBBWJAgLEgQFiQICxKEBQnCggRhQYKwIEFYkCAsSBAWJAgLEoQFCcKCBGFBgrAgQViQICxIEBYkCAsShAUJwoIEYUGCsCBBWJAgLEgQFiQICxKEBQnCggRhQYKwIEFYkCAsSBAWJAgLEoQFCcKCBGFBgrAgQViQICxIEBYkCAsShAUJwoIEYUGCsCBBWJAgLEgQFiQICxKEBQnCgsS/AbPvhe+YBrxEAAAAAElFTkSuQmCC"
        />
      </defs>
      <style></style>
      <use id="Background" href="#img1" x="-122" y="-246" />
    </svg>
  ),
  menu: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      {...props}
    >
      <path
        d="M3 5H11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M3 12H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M3 19H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  ),
  nextjs: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"
      />
    </svg>
  ),
  gitHub: (props: IconProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  google: ({ ...props }: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  ),
  x: (props: IconProps) => (
    <svg
      width="23"
      height="23"
      viewBox="0 0 1200 1227"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  ),
  facebook: ({ ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" {...props}>
      <path
        fill="currentColor"
        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
      />
    </svg>
  ),
  discord: ({ ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" {...props}>
      <path
        fill="currentColor"
        d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
      />
    </svg>
  ),
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  cart: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  ),
  product: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  ),
  store: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  ),
  users: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
    </svg>
  ),
  credit: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  ),
  dollarSign: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  activity: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  bot: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  ),
  robot: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="10" x="3" y="11" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" x2="8" y1="16" y2="16" />
      <line x1="16" x2="16" y1="16" y2="16" />
    </svg>
  ),
  javascript: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
      <path
        fill="currentColor"
        d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM243.8 381.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"
      />
    </svg>
  ),
  typescript: (props: IconProps) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="currentColor"
        d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"
      />
    </svg>
  ),
  bash: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="m8 16 2-2-2-2" />
      <path d="M12 18h4" />
    </svg>
  ),
  analytics: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
  dashboard: HomeIcon,
  avatar: AvatarIcon,
  placeholder: ImageIcon,
  settings: GearIcon,
  chevronLeft: ChevronLeftIcon,
};

import { useRef} from "react";

export const useCreateRef = () => {
    return useRef<HTMLDivElement | null>(null);
};

export default useCreateRef;
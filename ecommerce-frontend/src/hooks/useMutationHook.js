import { useMutation } from "@tanstack/react-query";

function useMutationHook(fnCallback) {
    const mutation = useMutation({
        mutationFn: fnCallback,
    });
    return mutation;
}

export default useMutationHook;

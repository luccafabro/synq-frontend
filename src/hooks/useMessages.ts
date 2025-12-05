import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient.ts";
import type { CreateMessageDto, MessageDto, ResponseDTO } from "@/lib/types.ts";

export interface UseMessagesOptions {
  pageSize?: number;
}

interface MessagesPage extends ResponseDTO<MessageDto[]> {}

export function useMessages(frequencyId?: number, options: UseMessagesOptions = {}) {
  const { pageSize = 50 } = options;
  const queryClient = useQueryClient();

  const queryKey = ["frequencyMessages", frequencyId];

  const infiniteQuery = useInfiniteQuery<MessagesPage>({
    queryKey,
    queryFn: ({ pageParam = 0 }) => {
      if (!frequencyId) throw new Error("frequencyId is required");
      return apiClient.getMessages(frequencyId, pageParam as number, pageSize);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination) return undefined;
      if (lastPage.pagination.lastPage) return undefined;
      const current = lastPage.pagination.currentPage ?? 0;
      return current + 1;
    },
    initialPageParam: 0,
    enabled: Boolean(frequencyId),
  });

  const mutation = useMutation({
    mutationFn: async (payload: Omit<CreateMessageDto, "frequencyId">) => {
      if (!frequencyId) throw new Error("frequencyId is required");
      return apiClient.postMessage(frequencyId, payload);
    },
    onMutate: async (variables) => {
      if (!frequencyId) return;
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<MessagesPage[]>(queryKey as any);

      const optimisticMessage: MessageDto = {
        id: Date.now(),
        externalId: `optimistic-${Date.now()}`,
        frequencyId,
        authorId: -1,
        authorUsername: "Você",
        content: variables.content,
        type: variables.type,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData(queryKey, (current: any) => {
        if (!current) {
          return {
            pages: [
              {
                data: [optimisticMessage],
                message: undefined,
                status: "OK",
                error: false,
                pagination: { currentPage: 0, pageSize, totalPages: 1, lastPage: true },
              },
            ],
            pageParams: [0],
          };
        }

        return {
          ...current,
          pages: current.pages.map((page: MessagesPage, index: number) =>
            index === 0
              ? {
                  ...page,
                  data: [optimisticMessage, ...(page.data ?? [])],
                }
              : page,
          ),
        };
      });

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous as any);
      }
    },
    onSettled: () => {
      if (!frequencyId) return;
      void queryClient.invalidateQueries({ queryKey });
    },
  });

  const sendMessage = (input: Omit<CreateMessageDto, "frequencyId">) => mutation.mutateAsync(input);

  const allMessages =
    infiniteQuery.data?.pages.flatMap((page) => page.data ?? []) ?? ([] as MessageDto[]);

  return {
    ...infiniteQuery,
    messages: allMessages,
    sendMessage,
    isSending: mutation.isPending,
  };
}

export type AppView = "list" | "editor" | "viewer";

export interface AppState {
  view: AppView;
  searchQuery: string;
  editingId: string | null;
  viewingId: string | null;
  message: string | null;
  messageIsError: boolean;
}

export function initialAppState(): AppState {
  return {
    view: "list",
    searchQuery: "",
    editingId: null,
    viewingId: null,
    message: null,
    messageIsError: false,
  };
}

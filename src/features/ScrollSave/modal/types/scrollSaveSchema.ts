//! рекорд <страница, позиция скролла>
export type ScrollSchema = Record<string, number>;

export interface iScrollSaveSchema {
    scroll: ScrollSchema;
}

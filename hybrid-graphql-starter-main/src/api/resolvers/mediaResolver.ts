import {MediaItem} from '@sharedTypes/DBTypes';
import {
  fetchAllMedia,
  fetchMediaById,
  fetchMediaByTag,
  postMedia,
  postTagToMedia,
} from '../models/mediaModel';

export default {
  Query: {
    mediaItems: async () => {
      return await fetchAllMedia();
    },
    mediaItem: async (_parent: undefined, args: {media_id: string}) => {
      const id = Number(args.media_id);
      return await fetchMediaById(id);
    },
    mediaItemsByTag: async (_parent: undefined, args: {tag: string}) => {
      return await fetchMediaByTag(args.tag);
    },
  },
  Mutation: {
    createMediaItem: async (
      _parent: undefined,
      args: {input: Omit<MediaItem, 'mediaId' | 'created_at' | 'thumbnail'>},
    ) => {
      return postMedia(args.input);
    },
    addTagToMediaItem: async (
      _parent: undefined,
      args: {input: {media_id: number; tag_name: string}},
    ) => {
      return await postTagToMedia(
        args.input.tag_name,
        Number(args.input.media_id),
      );
    },
  },
};

export interface IQueueService {
  emit(pattern: string, data: any);
}

export const IQueueServiceToken = Symbol('IQUEUE_SERVICE');

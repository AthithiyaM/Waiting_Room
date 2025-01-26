// import axios, { AxiosError } from 'axios';
// import { EDQueueResponse } from '../types';

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export class ApiError extends Error {
//   constructor(public statusCode: number, message: string) {
//     super(message);
//     this.name = 'ApiError';
//   }
// }

// export const fetchEDQueue = async (): Promise<EDQueueResponse> => {
//   try {
//     const response = await api.get<EDQueueResponse>('/ed/queue');
//     return response.data;
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       throw new ApiError(
//         error.response?.status || 500,
//         error.response?.data?.message || 'Failed to fetch ED queue data'
//       );
//     }
//     throw new Error('An unexpected error occurred');
//   }
// };

// export const fetchPatientById = async (patientId: string): Promise<EDQueueResponse> => {
//   try {
//     const response = await api.get<EDQueueResponse>(`/ed/queue/patient/${patientId}`);
//     return response.data;
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       throw new ApiError(
//         error.response?.status || 500,
//         error.response?.data?.message || 'Failed to fetch patient data'
//       );
//     }
//     throw new Error('An unexpected error occurred');
//   }
// };

export interface Analytics {
  linkId: string;
  totalClicks: number;
  trend: Array<{ date: string; clicks: number }>;
  devices: Array<{ type: 'Mobile' | 'Desktop'; value: number }>;
  sources: Array<{ source: string; value: number }>;
  visitors: { unique: number; returning: number };
}

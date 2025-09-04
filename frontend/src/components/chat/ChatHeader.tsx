import { Stethoscope, Shield, Activity, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { APP_CONFIG } from '@/constants/config';

export function ChatHeader() {
  return (
    <div className="mb-6 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
          <Stethoscope className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {APP_CONFIG.NAME}
        </h1>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        {APP_CONFIG.DESCRIPTION}
      </p>
      
      <div className="flex items-center justify-center gap-4 mt-4">
        <Badge variant="secondary" className="flex items-center gap-1">
          <Shield className="w-3 h-3" />
          Secure
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Activity className="w-3 h-3" />
          24/7 Active
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Heart className="w-3 h-3" />
          Reliable
        </Badge>
      </div>
    </div>
  );
}

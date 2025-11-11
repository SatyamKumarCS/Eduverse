import {Toaster} from 'sonner';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div >
        <div >
      {children}
      <Toaster position="top-center" richColors/>
      </div>
    </div>
  );
}
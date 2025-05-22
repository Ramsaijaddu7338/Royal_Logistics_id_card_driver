import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { useEmployee } from '../context/EmployeeContext';
import { UserCircle } from 'lucide-react';

const IDCard: React.FC<{ side?: 'front' | 'back' }> = ({ side = 'front' }) => {
  const { employeeData } = useEmployee();
  const qrCodeRef = useRef<HTMLCanvasElement>(null);
  const barcodeRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (qrCodeRef.current) {
      QRCode.toCanvas(qrCodeRef.current, JSON.stringify(employeeData), {
        width: 180,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
    }
    
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, employeeData.licenseNo, {
        format: "CODE128",
        width: 2,
        height: 30,
        displayValue: true,
        fontSize: 12,
        margin: 5
      });
    }
  }, [employeeData]);

  if (side === 'back') {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <div className="relative w-full" style={{ aspectRatio: '0.63/1' }}>
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4">
            <div className="flex items-center justify-center">
              <img src="/rl-logo.png" alt="Royal Logistics" className="h-[7rem] mb-2" />
            </div>
          </div>
          
          <div className="p-6 flex flex-col items-center justify-between h-[calc(100%-4rem)]">
            <div className="w-full space-y-6">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-2">Scan QR code to verify driver details</p>
                <canvas ref={qrCodeRef} className="mx-auto bg-white p-3 rounded-lg shadow-sm"></canvas>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="text-center space-y-2">
  <div className="mb-4">
    <h3 className="font-bold text-gray-800">Royal Logistics Headquarters</h3>
    <p className="text-sm text-gray-600">Global Transportation Solutions</p>
  </div>
  <p className="text-sm"><b>D.No. 8-1-284/OU/279/1, Plot No. 279/1 & 279,2nd Floor, OU Employees Co-operative Society Ltd.,Shaikpet, Hyderabad - 500 089</b></p>
  <p className="text-sm">Ph: 040-23568982</p>
  <p className="text-sm">www.royallogistics.com</p>
</div>

              </div>
            </div>

            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <div className="relative w-full" style={{ aspectRatio: '0.63/1', backgroundImage: 'url(/path/to/your/background.jpg)', backgroundSize: 'cover' }}>
        {/* Logo Header */}
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-3">
          <div className="flex flex-col items-center justify-center">
            <img src="/rl-logo.png" alt="Royal Logistics" className="h-[6rem] mb-2 ml-[1.7rem]" />
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <div className="w-24 h-24 rounded-lg bg-white p-1 shadow-lg">
            {employeeData.avatarUrl ? (
              <img src={employeeData.avatarUrl} alt="Driver" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="bg-yellow-300 rounded-lg w-full h-full flex items-center justify-center">
                <UserCircle size={60} className="text-gray-800" />
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 px-6 text-center">
          <h2 className="text-xl font-bold text-gray-800">{employeeData.name}</h2>
          <p className="text-lg font-medium text-yellow-600 mb-4">{employeeData.position}</p>
          
          <div className="space-y-2 text-left bg-gray-50/90 p-4 rounded-lg">
            <p className="flex justify-between">
              <span className="text-gray-600">License No:</span>
              <span className="font-semibold">{employeeData.licenseNo}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Expiry Date:</span>
              <span className="font-semibold">{new Date(employeeData.licenseExpiry).toLocaleDateString()}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Blood Group:</span>
              <span className="font-semibold">{employeeData.bloodGroup}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-semibold">{employeeData.phone}</span>
            </p>
          </div>

          <div className="mt-4 flex justify-center">
            <svg ref={barcodeRef}></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDCard;

import React, { createContext, useState, useContext } from 'react';

export interface EmployeeData {
  name: string;
  position: string;
  licenseNo: string;
  licenseExpiry: string;
  bloodGroup: string;
  phone: string;
  avatarUrl: string;
}

interface EmployeeContextType {
  employeeData: EmployeeData;
  updateEmployeeData: (data: Partial<EmployeeData>) => void;
}

const defaultEmployeeData: EmployeeData = {
  name: 'YOUR NAME',
  position: 'Driver',
  licenseNo: 'DL123456789',
  licenseExpiry: '',
  bloodGroup: 'A+',
  phone: '+919876543210',
  avatarUrl: '',
};

const EmployeeContext = createContext<EmployeeContextType>({
  employeeData: defaultEmployeeData,
  updateEmployeeData: () => {},
});

export const useEmployee = () => useContext(EmployeeContext);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employeeData, setEmployeeData] = useState<EmployeeData>(defaultEmployeeData);

  const updateEmployeeData = (data: Partial<EmployeeData>) => {
    setEmployeeData((prev) => ({ ...prev, ...data }));
  };

  return (
    <EmployeeContext.Provider value={{ employeeData, updateEmployeeData }}>
      {children}
    </EmployeeContext.Provider>
  );
};
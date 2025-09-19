
import React, { useState, useEffect, useCallback } from 'react';
import { PLAN_DATA, PLAN_OPTIONS } from './constants';
import { PlanKey, FamilyTypeKey, AgeRangeKey, Result } from './types';

// Moved InputField component outside of App component
const InputField: React.FC<{
    label: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    placeholder: string, 
    type?: string, 
    disabled?: boolean,
    maxLength?: number,
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search',
}> = ({label, value, onChange, placeholder, type = 'text', disabled = false, maxLength, inputMode}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={disabled}
            aria-disabled={disabled}
            maxLength={maxLength}
            inputMode={inputMode}
        />
    </div>
);

// Moved SelectField component outside of App component
const SelectField: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: {value: string, label: string}[], disabled?: boolean}> = ({label, value, onChange, options, disabled = false}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select
            value={value}
            onChange={onChange}
            className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={disabled}
            aria-disabled={disabled}
        >
            {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
    </div>
);

// Define props interface for ResultDisplay
interface ResultDisplayProps {
    result: Result;
    showResult: boolean;
    formatCurrency: (value: number) => string;
}

// Moved ResultDisplay component outside of App component and passed props
const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, showResult, formatCurrency }) => {
    const isSuccess = result.message === 'INGRESA SOLO CON APORTES';
    const isWarning = result.amount !== null || result.message === 'APORTE NO CUBRE GRUPO FAMILIAR';

    const containerClasses = `mt-8 p-6 rounded-lg shadow-md transition-all duration-500 ease-in-out transform ${showResult ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} ${
        isSuccess ? 'bg-green-100 border-green-400' : isWarning ? 'bg-orange-100 border-orange-400' : 'bg-blue-100 border-blue-400'
    }`;
    const messageClasses = `text-2xl font-bold ${
        isSuccess ? 'text-green-700' : isWarning ? 'text-orange-700' : 'text-blue-700'
    }`;

    return (
        <div className={containerClasses}>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Resultado de la Cotización</h3>
            
            {result.planValue !== undefined && (
                <p className="text-gray-600">
                    {result.discountApplied ? 'Valor del plan (25% DTO aplicado):' : 'Valor del plan:'} <span className="font-bold">{formatCurrency(result.planValue)}</span>
                </p>
            )}

            <div className="mt-4 text-center">
                <p className={messageClasses}>
                    {result.message}
                </p>
                {result.amount !== null && (
                    <p className="text-4xl font-extrabold text-orange-700 tracking-tight mt-1">
                        {formatCurrency(result.amount)}
                    </p>
                )}
            </div>
        </div>
    );
};


const App: React.FC = () => {
    const [aportes, setAportes] = useState<string>('');
    const [aporteTotal, setAporteTotal] = useState<number>(0);
    const [age, setAge] = useState<string>('');
    const [selectedPlan, setSelectedPlan] = useState<PlanKey>('200');
    const [applyDiscount, setApplyDiscount] = useState<boolean>(false);
    const [result, setResult] = useState<Result>({ message: 'Ingrese los datos para cotizar', amount: null });
    const [showResult, setShowResult] = useState<boolean>(false);

    const formatCurrency = useCallback((value: number): string => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
        }).format(value);
    }, []);

    useEffect(() => {
        const aportesNum = parseFloat(aportes);
        if (!isNaN(aportesNum) && aportesNum > 0) {
            const total = (aportesNum * 33.33 * 7.65) / 100;
            setAporteTotal(total);
        } else {
            setAporteTotal(0);
        }
    }, [aportes]);

    const calculateQuote = useCallback(() => {
        if (!aportes) {
            setResult({ message: 'Por favor, ingrese el monto de sus aportes.', amount: null });
            setShowResult(true);
            return;
        }

        if (!age) {
            setResult({ message: 'Por favor, ingrese las edades del grupo.', amount: null });
            setShowResult(true);
            return;
        }

        const ageStrings = age.split(',').map(a => a.trim()).filter(a => a !== '');
        if (ageStrings.length === 0) {
            setResult({ message: 'Por favor, ingrese al menos una edad válida.', amount: null });
            setShowResult(true);
            return;
        }

        const ages = ageStrings.map(a => parseInt(a, 10));

        for (const ageNum of ages) {
            if (isNaN(ageNum) || ageNum < 1 || ageNum > 100) {
                setResult({ message: `Una de las edades ingresadas es inválida. Ingrese edades entre 1 y 100.`, amount: null });
                setShowResult(true);
                return;
            }
        }

        const familySize = ages.length;
        
        if (selectedPlan === 'POR_APORTES') {
            const planValue = familySize * 9000;
            if (aporteTotal >= planValue) {
                setResult({ message: 'INGRESA SOLO CON APORTES', amount: null, planValue });
            } else {
                setResult({ message: 'APORTE NO CUBRE GRUPO FAMILIAR', amount: null, planValue });
            }
            setShowResult(true);
            return;
        }
        
        let derivedFamilyType: FamilyTypeKey | null = null;

        switch (familySize) {
            case 1: derivedFamilyType = 'Individual'; break;
            case 2: derivedFamilyType = 'Matrimonio'; break;
            case 3: derivedFamilyType = 'Matrimonio + 1 Hijo'; break;
            case 4: derivedFamilyType = 'Matrimonio + 2 Hijos'; break;
            case 5: derivedFamilyType = 'Matrimonio + 3 Hijos'; break;
            default:
                setResult({ message: 'El cotizador solo admite hasta 5 integrantes por grupo familiar.', amount: null });
                setShowResult(true);
                return;
        }

        const maxAge = Math.max(...ages);

        const getAgeRange = (ageVal: number): AgeRangeKey | null => {
            if (ageVal >= 1 && ageVal <= 29) return '1-29';
            if (ageVal >= 30 && ageVal <= 39) return '30-39';
            if (ageVal >= 40 && ageVal <= 49) return '40-49';
            if (ageVal >= 50 && ageVal <= 59) return '50-59';
            return null;
        };

        const ageRange = getAgeRange(maxAge);
        if (!ageRange) {
            setResult({ message: 'La edad del integrante mayor está fuera de los rangos cubiertos (1-59 años).', amount: null });
            setShowResult(true);
            return;
        }

        const planValue = PLAN_DATA[selectedPlan]?.age_ranges[ageRange]?.[derivedFamilyType];

        if (planValue === undefined) {
            setResult({ message: 'No se encontró un valor para la selección actual.', amount: null });
            setShowResult(true);
            return;
        }

        let finalPlanValue = planValue;
        if (applyDiscount) {
            finalPlanValue = planValue * 0.75;
        }

        if (aporteTotal >= finalPlanValue) {
            setResult({ message: 'INGRESA SOLO CON APORTES', amount: null, planValue: finalPlanValue, discountApplied: applyDiscount });
        } else {
            const difference = finalPlanValue - aporteTotal;
            setResult({ message: 'A PAGAR:', amount: difference, planValue: finalPlanValue, discountApplied: applyDiscount });
        }
        setShowResult(true);
    }, [aportes, age, aporteTotal, selectedPlan, applyDiscount]);
    
    const handleNumericInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value === '' || /^[0-9]*$/.test(value)) {
            setter(value);
            setShowResult(false);
        }
    };

    const handleAgeInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value === '' || /^[0-9, ]*$/.test(value)) {
            setter(value);
            setShowResult(false);
        }
    };

    const memberCount = age.split(',').map(a => a.trim()).filter(a => a).length;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <img src="https://www.premedic.com.ar/wp-content/uploads/2021/04/logopremedic.png" alt="Premedic Logo" className="h-12 mx-auto mb-2" />
                    <h1 className="text-4xl font-extrabold text-secondary tracking-tight">Cotizador de Planes</h1>
                    <p className="mt-2 text-lg text-gray-600">Vigencia Agosto 2025</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="space-y-6">
                        <InputField 
                            label="Aportes"
                            value={aportes}
                            onChange={handleNumericInputChange(setAportes)}
                            placeholder="Ej: 70000"
                            maxLength={7}
                            inputMode="numeric"
                        />
                        
                        <div className="p-4 bg-gray-100 rounded-md">
                            <p className="text-sm font-medium text-gray-600">Aporte Total Calculado:</p>
                            <p className="text-2xl font-bold text-primary">{formatCurrency(aporteTotal)}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectField 
                                label="Plan"
                                value={selectedPlan}
                                onChange={(e) => {
                                    const newPlan = e.target.value as PlanKey;
                                    setSelectedPlan(newPlan);
                                    if (newPlan === 'POR_APORTES') {
                                        setApplyDiscount(false);
                                    }
                                    setShowResult(false);
                                }}
                                options={PLAN_OPTIONS}
                            />
                            <InputField 
                                label="Edades del grupo (separadas por coma)"
                                value={age}
                                onChange={handleAgeInputChange(setAge)}
                                placeholder="Ej: 35, 32, 5"
                                inputMode="text"
                            />
                        </div>
                        
                        {memberCount > 0 && (
                            <div className="p-2 bg-blue-50 rounded-md text-center border border-blue-200">
                                <p className="text-sm font-medium text-blue-800">
                                    Número de integrantes detectado: <span className="font-bold text-lg">{memberCount}</span>
                                </p>
                            </div>
                        )}

                        <div className="flex items-center justify-start">
                             <input
                                id="discount-checkbox"
                                type="checkbox"
                                checked={applyDiscount}
                                onChange={(e) => {
                                    setApplyDiscount(e.target.checked);
                                    setShowResult(false);
                                }}
                                className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={selectedPlan === 'POR_APORTES'}
                                aria-disabled={selectedPlan === 'POR_APORTES'}
                             />
                             <label htmlFor="discount-checkbox" className="ml-3 block text-sm font-medium text-gray-700 select-none">
                                 APLICAR DESCUENTO DEL 25%
                             </label>
                         </div>


                        <button
                            onClick={calculateQuote}
                            className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                            aria-label="Cotizar plan seleccionado"
                        >
                            Cotizar
                        </button>
                    </div>

                    <ResultDisplay result={result} showResult={showResult} formatCurrency={formatCurrency} />
                </div>
                <footer className="text-center mt-8 text-sm text-gray-500">
                    <p>Los valores son de referencia y pueden estar sujetos a cambios.</p>
                    <p>&copy; {new Date().getFullYear()} Cotizador de Planes. Todos los derechos reservados.</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
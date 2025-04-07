'use client';

import React, { useEffect, useRef } from 'react';
import 'mathlive';

interface MathfieldElement extends HTMLElement {
    value: string;
    setValue: (value: string) => void;
    getValue: () => string;
    mathVirtualKeyboardPolicy?: string;
    virtualkeyboardmode?: string;  // Thêm thuộc tính virtualkeyboardmode
}

interface MathFieldProps {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export function MathField({ value = '', onChange, className }: MathFieldProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mathFieldRef = useRef<MathfieldElement | null>(null);

    useEffect(() => {
        if (containerRef.current && !mathFieldRef.current) {
            const mathField = document.createElement('math-field') as MathfieldElement;
            mathField.setAttribute('virtualkeyboardmode', 'onfocus');  // Mặc định bật bàn phím ảo
            mathField.mathVirtualKeyboardPolicy = 'manual';
            mathField.className = className ?? 'w-full overflow-x-auto break-words p-2 border border-gray-300 rounded-md';

            mathField.setValue(value);
            mathField.addEventListener('input', () => {
                const currentValue = mathField.getValue();
                onChange?.(currentValue);
            });

            containerRef.current.appendChild(mathField);
            mathFieldRef.current = mathField;
        }


        return () => {
            if (mathFieldRef.current) {
                mathFieldRef.current.remove();
                mathFieldRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const toggleKeyboard = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key.toLowerCase() === 'k') {
                event.preventDefault();

                const vk = (window).mathVirtualKeyboard;
                if (vk) {
                    if (vk.visible) {
                        vk.hide();
                    } else {
                        vk.show();
                    }
                }
            }
        };
        window.addEventListener('keydown', toggleKeyboard);
        return () => {
            window.removeEventListener('keydown', toggleKeyboard);
        };
    }, []);

    useEffect(() => {
        if (mathFieldRef.current && value !== undefined) {
            mathFieldRef.current.setValue(value);
        }
    }, [value]);



    return (
        <div className="w-full">
            <div 
                ref={containerRef} 
                className="md:max-w-[470px] max-w-[340px] border overflow-auto break-words"
                style={{ minHeight: '2rem', maxHeight: '200px' }}
            />
        </div>
    );
}

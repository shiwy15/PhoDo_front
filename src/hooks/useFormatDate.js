import React from 'react'
import { useCallback } from 'react';

const useFormatDate = () => {
    const formatDate = useCallback((isoString) => {
        if (!isoString) {
            return "날짜 데이터 없음";
        }

        const date = new Date(isoString);

        if (isNaN(date.getTime())) {
            return "날짜 데이터 없음";
        }

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}.${month}.${day} ${hours}:${minutes}`;
    }, []);

    return formatDate;
};

export default useFormatDate;


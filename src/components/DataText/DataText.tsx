import { useEffect, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Text } from '@chakra-ui/react';

interface Props {
  created: string | number | Date;
  updated: string | number | Date;
  sufix: boolean;
}

export function DataText({ created, updated, sufix }: Props) {
  const [dateText, setDateText] = useState('');
  const getPostDate = (
    updated: string | number | Date,
    created: string | number | Date,
    sufix?: boolean
  ) => {
    let date;
    if (updated != created) {
      date = new Date(updated);
    } else {
      date = new Date(created);
    }
    setDateText(
      formatDistanceToNowStrict(date, { locale: ptBR, addSuffix: sufix })
        .replace('segundos', 's')
        .replace('segundo', 's')
        .replace('minutos', 'min')
        .replace('minuto', 'min')
        .replace('horas', 'h')
        .replace('hora', 'h')
        .replace('dias', 'd')
        .replace('dia', 'd')
        .replace('anos', 'a')
        .replace('ano', 'a')
    );
  };
  useEffect(() => {
    getPostDate(updated, created, sufix);
    const interval = setInterval(() => {
      getPostDate(updated, created, sufix);
    }, 60000);

    return () => clearInterval(interval);
  }, [updated, created, sufix]);
  return (
    <>
      <Text fontSize="12px" color={'#515151'}>
        {dateText}
      </Text>
    </>
  );
}

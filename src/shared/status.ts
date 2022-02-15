interface StatusType {    
    code: string;
    desc: string;
    color: string;
} 

export const status: Record<string, StatusType>  = {
    open: {
        code: 'open',
        desc: 'Aberta',
        color: '#5C6BC0'
    },
    caution: {
        code: 'caution',
        desc: 'Atenção',
        color: '#F57C00'
    },
    late: {
        code: 'late',
        desc: 'Atrasada',
        color: '#D32F2F'
    },
    finished: {
        code: 'finished',    
        desc: 'Concluída',
        color: '#2E7D32'
    }
}

interface StatusType {    
    desc: string;
    color: string;
} 

export const status: Record<string, StatusType>  = {
    open: {
        desc: 'Aberta',
        color: '#5C6BC0'
    },
    caution: {
        desc: 'Atenção',
        color: '#F57C00'
    },
}

/*
'openStatus': {
        desc: 'Aberta',
        color: '#5C6BC0'
    ,
    cautionStatus: {        
        desc: 'Atenção',
        color: '#F57C00'
    },
    lateStatus: {        
        desc: 'Atrasada',
        color: '#D32F2F'
    },
    finishedStatus: {    
        desc: 'Concluída',
        color: '#2E7D32'
    }
*/
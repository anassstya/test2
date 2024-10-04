const url = "https://anasstya.amocrm.ru/api/v4/leads"; 

async function fetchDeals() {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQzMzBjNTJmZDlmMTk0YjFiYzUxMWZjY2ViOTZlZjcwODI4ZDFhNmEzMzk5YjMwMzljZDc2MTgwYTg1ZTlkOWE2MTYxOThmMmMxYzZmMGE5In0.eyJhdWQiOiJhZjFjY2M4OC0xZjY2LTQ2NGYtYWE5MC00YmJkY2FjYTBlZDkiLCJqdGkiOiI0MzMwYzUyZmQ5ZjE5NGIxYmM1MTFmY2NlYjk2ZWY3MDgyOGQxYTZhMzM5OWIzMDM5Y2Q3NjE4MGE4NWU5ZDlhNjE2MTk4ZjJjMWM2ZjBhOSIsImlhdCI6MTcyNzc3MDczMywibmJmIjoxNzI3NzcwNzMzLCJleHAiOjE3MjkyOTYwMDAsInN1YiI6IjExNTg3MzYyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTgxNjE0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZmE0OGJhMWEtODFlMi00Njg3LTk2NzgtZmQxNjMzZmU0ZTM2IiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.SFGURMmy3gUn5GFXm4koHemtNOe0tfo7H90LtyVKJRi_L1SbIwu5kfnUeY4d0cElhTcML7WJt4nmG3hc4lvbE6qX5jYjMBqVdJr9oTCpFIqlEjxsQv3zcgibu0poQWrnDuZ8B-OPXvRoclUOT21-UAiwu62bjM3AUG-Q8qUuDLU8Cugzz3_la2Xuxsz2VhWrDKMaRZ1pKJEQLciJc_vCpZW3UFLrI2jwLN1iAkkEjthToIs0JwGeVr0HFOVoMX2d39YIO8dinbToT8YXDTXnlahiAkhs2OfAYMSHqcTQsMdXRMKovS-fcrNuitPgNj6vNi7BSGqecpd7Og9P3Q8nEA', 
          'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        if (data._embedded && data._embedded.leads) {
            const leads = data._embedded.leads;
          
            const dealsDictionary = {};
            leads.forEach(lead => {
                dealsDictionary[lead.id] = {
                    name: lead.name,
                    price: lead.price,
                    responsible_user_id: lead.responsible_user_id,
                    status_id: lead.status_id,
                    created_at: lead.created_at,
                    updated_at: lead.updated_at,
                    closed: lead.closest_task_at
                };
            });
            return dealsDictionary;
        }
    } 
}

export async function getDeals() {
  const deals = await fetchDeals(); 
  return deals;
}


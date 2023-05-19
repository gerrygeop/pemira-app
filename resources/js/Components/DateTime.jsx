import { format } from "date-fns";
import idLocale from "date-fns/locale/id";

export default function DateTime({ datetime }) {
    return (
        <>
            {format(new Date(datetime), "d MMM yyyy, HH:mm", {
                locale: idLocale,
            })}
        </>
    );
}

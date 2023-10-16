import { LeadTimeForChange } from "@prisma/client";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import db from "~/infra/database/postgres-db"

type LoaderData = { items: Array<LeadTimeForChange> };

export const loader: LoaderFunction = async () => {
    const data = {
        items: await db.leadTimeForChange.findMany({
            orderBy: {
                id: 'desc',
            },
        }),
    };

    return data;
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    if (formData.has("delete")) {
        const id: any = formData.get("delete");
        await db.leadTimeForChange.delete({
            where: {
                id: parseInt(id)
            },
        })

        return redirect(`/lead-time-for-change`);

    }

    if (formData.has("create")) {
        const jiraTicket: any = formData.get("jiraTicket");
        await db.leadTimeForChange.create({ data: { jiraTicket } });
        return redirect(`/lead-time-for-change`);

    }

    throw new Error("Unexpected action");
};


export default function LeadTimeForChangePage() {
    const data = useLoaderData<LoaderData>()

    return (
        <>
            <div className="p-4">
                <div className="rounded-lg border bg-white p-4">
                    <div className="font-medium text-base flex justify-between p-2">
                        <p className="w-96">Id</p>
                        <p className="hidden lg:flex lg:flex-1">Jira Ticket</p>
                        <p className="hidden lg:flex lg:flex-1">Date</p>
                        <p className="hidden md:flex md:w-20 md:justify-center">

                        </p>
                    </div>
                    <ul className="h-56 overflow-auto">
                        {data.items.map((item, id) => (
                            <li key={id}>
                                <div className="font-extralight text-base my-2 flex items-center justify-between rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
                                    <p className="w-96">{item.id}</p>
                                    <p className="hidden lg:flex lg:flex-1">
                                        {item.jiraTicket}
                                    </p><p className="hidden lg:flex lg:flex-1">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="hidden md:flex md:w-20 md:justify-center">
                                        <Form method="post">
                                            <button type="submit" name="delete" value={item.id} className="rounded-lg bg-purple-200 px-2 py-1 text-center">
                                                Delete
                                            </button>
                                        </Form>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="p-4">
                <div className="rounded-lg border bg-white p-4">
                    <div className="font-medium text-base flex p-2">
                        <p>Create an entry</p>
                    </div>
                    <Form method="post" className="font-extralight text-base my-2 rounded-lg flex flex-col space-y-4">
                        <div className="flex items-center">
                            <label htmlFor="jiraTicket" className="mr-4">Jira Ticket :</label>
                            <input
                                type="text"
                                id="jiraTicket"
                                name="jiraTicket"
                                className="border p-2 rounded"
                                placeholder="Enter the jira ticket ..."
                            />
                        </div>
                        <button type="submit" name="create" value="true" className="w-40 rounded-lg bg-purple-200 p-1 text-center">
                            Submit
                        </button>
                    </Form>
                </div >
            </div>
        </>
    )
}

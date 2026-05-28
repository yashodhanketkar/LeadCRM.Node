import { LeadService } from "../services/leads.js";

export class LeadsController {
  private readonly svc = new LeadService();

  getAll = async (req: any, res: any) => {
    const leads = await this.svc.getAll(req.userId);
    res.send(leads);
  };

  getAllManager = async (_req: any, res: any) => {
    const leads = await this.svc.getAllManager();
    res.send(leads);
  };

  getById = async (req: any, res: any) => {
    const lead = await this.svc.getById(req.params.id, Number(req.userId));
    if (lead instanceof Error)
      return res.status(404).send({ error: lead.message });

    res.send(lead);
  };

  getByIdManager = async (req: any, res: any) => {
    const lead = await this.svc.getByIdManager(req.params.id);
    console.log(lead);
    if (lead instanceof Error)
      return res.status(404).send({ error: lead.message });

    res.send(lead);
  };

  create = async (req: any, res: any) => {
    const lead = req.body;
    const created = await this.svc.create(lead, Number(req.userId));
    if (created instanceof Error)
      return res.status(400).send({ error: created.message });

    res.status(201).send({ message: created });
  };

  updateStatus = async (req: any, res: any) => {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await this.svc.updateStatus(
      Number(id),
      status,
      Number(req.userId),
    );
    if (updated instanceof Error)
      return res.status(400).send({ error: updated.message });

    res.send({ message: updated });
  };

  delete = async (req: any, res: any) => {
    const { id } = req.params;
    const deleted = await this.svc.delete(Number(id), Number(req.userId));
    if (deleted instanceof Error)
      return res.status(400).send({ error: deleted.message });

    res.send({ message: deleted });
  };
}

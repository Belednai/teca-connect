import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEdit, 
  faDollarSign,
  faChartLine,
  faMapMarkedAlt,
  faSave,
  faPercent,
  faBullseye,
  faHandHoldingHeart
} from "@fortawesome/free-solid-svg-icons";
import { payams, Payam } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const AdminPayams = () => {
  const [payamData, setPayamData] = useState<Payam[]>(payams);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPayam, setEditingPayam] = useState<Payam | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    raisedAmount: '',
    requestedAmount: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({
      raisedAmount: '',
      requestedAmount: '',
      description: ''
    });
  };

  const handleEdit = (payam: Payam) => {
    setEditingPayam(payam);
    setFormData({
      raisedAmount: payam.raisedAmount.toString(),
      requestedAmount: payam.requestedAmount.toString(),
      description: payam.description
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingPayam) return;
    
    setIsLoading(true);
    try {
      const updatedPayam: Payam = {
        ...editingPayam,
        raisedAmount: parseFloat(formData.raisedAmount) || 0,
        requestedAmount: parseFloat(formData.requestedAmount) || 0,
        description: formData.description
      };

      setPayamData(prev => prev.map(payam => 
        payam.id === editingPayam.id ? updatedPayam : payam
      ));
      
      resetForm();
      setEditingPayam(null);
      setIsEditDialogOpen(false);
      toast({
        title: "Success",
        description: "Payam fundraising progress updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update payam progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressPercentage = (payam: Payam) => {
    return payam.requestedAmount > 0 ? Math.round((payam.raisedAmount / payam.requestedAmount) * 100) : 0;
  };

  const getTotalRaised = () => {
    return payamData.reduce((sum, payam) => sum + payam.raisedAmount, 0);
  };

  const getTotalRequested = () => {
    return payamData.reduce((sum, payam) => sum + payam.requestedAmount, 0);
  };

  const getOverallProgress = () => {
    const total = getTotalRequested();
    const raised = getTotalRaised();
    return total > 0 ? Math.round((raised / total) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Fundraising Progress Management</h1>
        <p className="text-muted-foreground">Update fundraising progress for each payam and track overall goals</p>
      </div>

      {/* Overall Progress Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif text-xl flex items-center">
            <FontAwesomeIcon icon={faChartLine} className="h-5 w-5 mr-3" />
            Overall Fundraising Progress
          </CardTitle>
          <CardDescription>
            Total progress across all six payams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                ${getTotalRaised().toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Raised</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                ${getTotalRequested().toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Goal</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {getOverallProgress()}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
          </div>
          <div className="mt-6">
            <Progress value={getOverallProgress()} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Individual Payam Progress */}
      <div className="grid gap-6">
        {payamData.map((payam) => {
          const progress = getProgressPercentage(payam);
          return (
            <Card key={payam.id} className="shadow-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-serif flex items-center">
                      <FontAwesomeIcon icon={faMapMarkedAlt} className="h-5 w-5 mr-2" />
                      {payam.name} Payam
                    </CardTitle>
                    <CardDescription className="mt-2">{payam.description}</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(payam)}
                  >
                    <FontAwesomeIcon icon={faEdit} className="h-4 w-4 mr-2" />
                    Update Progress
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      ${payam.raisedAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center">
                      <FontAwesomeIcon icon={faHandHoldingHeart} className="h-3 w-3 mr-1" />
                      Raised
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      ${payam.requestedAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center">
                      <FontAwesomeIcon icon={faBullseye} className="h-3 w-3 mr-1" />
                      Goal
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {progress}%
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center">
                      <FontAwesomeIcon icon={faPercent} className="h-3 w-3 mr-1" />
                      Progress
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                  <span>Remaining: ${(payam.requestedAmount - payam.raisedAmount).toLocaleString()}</span>
                  <Badge variant={progress >= 100 ? "default" : progress >= 75 ? "secondary" : "outline"}>
                    {progress >= 100 ? "Complete" : progress >= 75 ? "Near Goal" : "In Progress"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Fundraising Progress</DialogTitle>
            <DialogDescription>
              Update the raised amount and description for {editingPayam?.name} Payam.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="requestedAmount">Target Amount ($) *</Label>
              <Input
                id="requestedAmount"
                type="number"
                value={formData.requestedAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, requestedAmount: e.target.value }))}
                placeholder="Enter target amount"
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="raisedAmount">Raised Amount ($) *</Label>
              <Input
                id="raisedAmount"
                type="number"
                value={formData.raisedAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, raisedAmount: e.target.value }))}
                placeholder="Enter amount raised"
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Update the payam description"
                rows={4}
              />
            </div>

            {editingPayam && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-sm space-y-1">
                  <div><strong>New Target:</strong> ${formData.requestedAmount ? parseFloat(formData.requestedAmount).toLocaleString() : '0'}</div>
                  <div><strong>New Raised:</strong> ${formData.raisedAmount ? parseFloat(formData.raisedAmount).toLocaleString() : '0'}</div>
                  <div><strong>New Progress:</strong> {
                    formData.raisedAmount && formData.requestedAmount 
                      ? Math.round((parseFloat(formData.raisedAmount) / parseFloat(formData.requestedAmount)) * 100)
                      : 0
                  }%</div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={isLoading || !formData.raisedAmount || !formData.requestedAmount}>
                <FontAwesomeIcon icon={faSave} className="h-4 w-4 mr-2" />
                {isLoading ? 'Updating...' : 'Update Progress'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPayams;
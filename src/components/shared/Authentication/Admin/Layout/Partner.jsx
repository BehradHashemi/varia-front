import {
  Avatar,
  Box,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function Partner({authors, filteredAdmins }) {
  return (
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">اعضای تیم</Typography>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            ادمین‌ها
          </Typography>
          <DragDropContext>
            <Droppable droppableId="admins">
              {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                  {filteredAdmins.map((admin, index) => (
                    <Draggable
                      key={admin.id}
                      draggableId={admin.id}
                      index={index}
                    >
                      {(provided) => (
                        <Paper
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            p: 2,
                            my: 1,
                            display: "flex",
                            alignItems: "center",
                            boxShadow: 3,
                            borderRadius: 2,
                            transition: "0.3s ease",
                            "&:hover": {
                              boxShadow: 6,
                            },
                          }}
                        >
                          <Avatar
                            src={admin.avatar}
                            sx={{ width: 50, height: 50, ml: 2 }}
                          />
                          <Box>
                            <Typography sx={{ fontWeight: "bold" }}>
                              {admin.name}
                            </Typography>
                            <Typography variant="body2">
                              {admin.email}
                            </Typography>
                          </Box>
                        </Paper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            نویسنده‌ها
          </Typography>
          {authors.map((author) => (
            <Paper
              key={author.id}
              sx={{
                p: 2,
                my: 1,
                display: "flex",
                alignItems: "center",
                boxShadow: 3,
                borderRadius: 2,
                transition: "0.3s ease",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
            >
              <Avatar
                src={author.avatar}
                sx={{ width: 50, height: 50, ml: 2 }}
              />
              <Box>
                <Typography sx={{ fontWeight: "bold" }}>
                  {author.name}
                </Typography>
                <Typography variant="body2">{author.email}</Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Paper>
    </Grid>
  );
}

export default Partner;

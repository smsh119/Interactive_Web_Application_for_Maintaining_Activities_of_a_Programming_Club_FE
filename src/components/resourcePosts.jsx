import React, { useState } from "react";
import ResourcePostsForm from "./resourcePostsForm";
import { getCurrentUser } from "../services/authService";

function ResourcePosts(props) {
  const [showForm, setShowForm] = useState(false);
  const isAdmin = getCurrentUser() ? getCurrentUser().isAdmin : false;

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {isAdmin && (
        <button className="btn btn-lg custom-btn mt-2" onClick={handleShowForm}>
          Add Post
        </button>
      )}
      {showForm && (
        <div className="resourceForm">
          <ResourcePostsForm onClose={handleShowForm} />
        </div>
      )}
      <div className="postDiv">
        <h2>Number theory</h2>
        <div>
          Number theory is the study of the integers (e.g. whole numbers) and
          related objects. Topics studied by number theorists include the
          problem of determining the distribution of prime numbers within the
          integers and the structure and number of solutions of systems of
          polynomial equations with integer coefficients.
        </div>
      </div>
      <div className="postDiv">
        <h2>Graph Theory</h2>
        <div>
          In mathematics, graph theory is the study of graphs, which are
          mathematical structures used to model pairwise relations between
          objects. A graph in this context is made up of vertices (also called
          nodes or points) which are connected by edges (also called links or
          lines). A distinction is made between undirected graphs, where edges
          link two vertices symmetrically, and directed graphs, where edges link
          two vertices asymmetrically. Graphs are one of the principal objects
          of study in discrete mathematics.
        </div>
      </div>
      <div className="postDiv">
        <h2>Combinatorics</h2>
        <div>
          combinatorics, also called combinatorial mathematics, the field of
          mathematics concerned with problems of selection, arrangement, and
          operation within a finite or discrete system. Included is the closely
          related area of combinatorial geometry.
        </div>
      </div>
    </div>
  );
}

export default ResourcePosts;
